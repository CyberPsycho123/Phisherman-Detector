import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express()


app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json())
const port = process.env.PORT || 3000


function encodeURL(url) {
  return Buffer.from(url).toString('base64').replace(/=+$/, '')
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API});

async function delay(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, time * 1000);
  })
}


let queue = [];
let processing = false;



async function gemini(datasets) {

  const systemInstruction = `
    You are a Cybersecurity Analyst. Analyze the dataset provided.
    
    OUTPUT RULES:
    - DO NOT use Markdown formatting (no asterisks, no bolding, no headers).
    - Use plain text only.
    - Provide: RISK_LEVEL, PRIMARY_THREAT, and KEY_EVIDENCE.
    - RISK_LEVEL SHOULD BE OUT OF 100
    - RETURN THE OUTPUT AS OBJECT IN JS


    FORMAT:
    {
      "RISK_LEVEL": number,
      "PRIMARY_THREAT": "string",
      "KEY_EVIDENCE": "string"
    }

  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemInstruction}\n\nDATASET: ${JSON.stringify(datasets)}` }]
      }
    ],
    generationConfig: {
      temperature: 0.1
    }
  });

  return response.text.trim();
}



async function scan_virustotal(url) {
  const user_id = encodeURL(url)
  const response = await fetch(`https://www.virustotal.com/api/v3/urls/${user_id}`, {
    method: 'GET',
    headers: {
      'x-apikey': process.env.VIRUSTOTAL_API,
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return response.json()
}


async function phish(url) {
  const hostname = new URL(url).hostname;
  const response = await fetch("https://api.phishstats.info/api/phishing", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  let result = "Not found!"
  for (let i = 0; i < data.length; i++) {
    const data_hostname = new URL(data[i].url).hostname
    if (data_hostname == hostname) {
      result = data[i]
    }
  }

  return result
}


async function manageQueue() {
  if (processing || queue.length === 0) return;

  processing = true;

  const dataset= queue.shift();

  try {
    const result = await gemini(dataset);
    return result
  } catch (err) {
    console.log(err)
  } finally {
    await delay(5);
    processing = false;
    
    manageQueue();
  }
}

app.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    const virustotal = await scan_virustotal(url);
    const phishstats = await phish(url);
    const virus_result = virustotal.data?.attributes || {};
    const dataset = phishstats !== "Not found!" ? [virus_result] : [virus_result, phishstats];
    queue.push(dataset);
    const genai = await manageQueue()

    const result = JSON.parse(genai);
    res.json({ success: true, score: result.RISK_LEVEL, desc: result.KEY_EVIDENCE });

  } catch (error) {
    console.error("Request failed:", error);
    res.status(500).json({ success: false, error: "Analysis failed or timed out" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
