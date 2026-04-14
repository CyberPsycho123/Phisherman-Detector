# 🎣 Phisherman Detector

> Paste a URL. Know if it's safe. It's that simple.

**Phisherman Detector** is a web-based phishing detection tool that analyzes any URL and tells you how secure (or dangerous) it is. It combines data from **VirusTotal**, **PhishStats**, and **Google Gemini AI** to deliver a comprehensive, multi-layered security verdict — all in one place. Built with a JavaScript/CSS frontend and a Node.js backend, it's designed to help everyday users identify malicious links before clicking them.

🔗 **Live Demo:** [phisherman-detector.vercel.app](https://phisherman-detector.vercel.app)

---

## 🚀 Features

- 🔍 **Instant URL Analysis** — Paste any URL and get a security assessment in seconds
- 🛡️ **Multi-Source Phishing Detection** — Combines results from VirusTotal, PhishStats, and Gemini AI for a well-rounded verdict
- 🤖 **AI-Powered Insights** — Google Gemini interprets and summarizes the combined threat data in plain language
- 📊 **Aggregated Risk Score** — A single, easy-to-understand security score derived from multiple intelligence sources
- ⚡ **Lightweight & Fast** — Clean frontend with no bloat
- 🌐 **Deployed on Vercel** — Always accessible, no setup needed for end users

---

## 🛠️ Tech Stack

| Layer          | Technology              |
|----------------|-------------------------|
| Frontend       | React.js,css3           |
| Backend        | Express.js,Node.js      |
| Threat Intel   | VirusTotal API          |
| Phishing DB    | PhishStats API          |
| AI Analysis    | Google Gemini API       |
| Hosting        | Vercel                  |

---

## 📁 Project Structure

```
Phisherman-Detector/
├── frontend/       # UI — the user-facing web interface
└── backend/        # API — URL analysis and phishing detection logic
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/CyberPsycho123/Phisherman-Detector.git
cd Phisherman-Detector
```

### 2. Set Up the Backend

```bash
cd backend
npm install
npm start
```

The backend server will start locally (default: `http://localhost:3000`).

### 3. Set Up the Frontend

```bash
cd ../frontend
# Open index.html in your browser, or use a local dev server:
npx serve .
```

> If the frontend makes API calls to the backend, update the API base URL in the frontend config/source to point to your local backend.

---

## 🧪 How It Works

1. User pastes a URL into the input field on the web interface.
2. The frontend sends the URL to the backend API.
3. The backend queries **three intelligence sources in parallel**:
   - 🦠 **VirusTotal API** — Scans the URL against 70+ antivirus engines and threat databases to detect malware, phishing, and malicious content.
   - 🎣 **PhishStats API** — Cross-references the URL against a live, community-driven database of known phishing URLs.
   - 🤖 **Google Gemini API** — Uses AI to interpret and summarize the combined findings, translating raw threat data into a clear, human-readable security verdict.
4. The backend aggregates all three results into a unified risk score and analysis.
5. The final verdict is displayed to the user — safe, suspicious, or dangerous.

```
User URL
   │
   ▼
┌─────────────────────────────────────────────┐
│               Backend API                   │
│                                             │
│  ┌─────────────┐  ┌────────────┐  ┌───────┐│
│  │  VirusTotal │  │ PhishStats │  │Gemini ││
│  │     API     │  │    API     │  │  AI   ││
│  └──────┬──────┘  └─────┬──────┘  └───┬───┘│
│         └───────────────┴─────────────┘    │
│                     │                      │
│            Aggregate & Score               │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
              Security Verdict
```

---

## 🔑 API Keys & Environment Variables

This project requires API keys for the three intelligence services. Create a `.env` file in the `backend/` directory:

```env
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
PHISHSTATS_API_KEY=your_phishstats_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

You can obtain the keys here:
- **VirusTotal** → [virustotal.com/gui/my-apikey](https://www.virustotal.com/gui/my-apikey)
- **PhishStats** → [phishstats.info](https://phishstats.info)
- **Google Gemini** → [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

> ⚠️ Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## 🌍 Deployment

The frontend is deployed on **Vercel**. To deploy your own fork:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import your fork
3. Set the root directory to `frontend`
4. Deploy!

For the backend, you can deploy to Vercel (as a serverless function), Render, Railway, or any Node.js-compatible host.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project does not currently specify a license. Please contact the author before using it in production or redistributing.

---

## 👤 Author

**CyberPsycho123**
- GitHub: [@CyberPsycho123](https://github.com/CyberPsycho123)

---

> ⚠️ **Disclaimer:** Phisherman Detector is a tool to assist with URL safety checks. It should not be used as the sole means of determining whether a site is malicious. Always exercise caution online.
