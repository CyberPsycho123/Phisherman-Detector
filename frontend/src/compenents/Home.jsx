import React, { useState, useRef } from "react";
import "./Home.css";
import config from "../config";

function isUrl(url) {
    if (url.includes('http')) {
        return true
    }


    return false
}

async function analyzeUrl(raw) {
    const url = raw.trim();
    let riskScore = 0
    let desc="Please enter the website url !!"
    let is_this_url = isUrl(url)



    let verdict, status;

    if (is_this_url == false) {
        verdict = "Not a url";
        status = "no";
        return { riskScore, verdict, status, desc };
    }

    const request = await fetch(`${config.API_BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: url })
    })
    const response = await request.json()
    if (response.success == true) {
        riskScore = response.score
        desc=response.desc
    }

    if (riskScore <= 15) {
        verdict = "Likely Safe";
        status = "safe";
    } else if (riskScore <= 45) {
        verdict = "Suspicious";
        status = "warning";
    } else {
        verdict = "Phishing Risk";
        status = "danger";
    }

    return { riskScore, verdict, status,desc };
}

const VERDICT_META = {
    safe: { icon: "✦"},
    warning: { icon: "◈"},
    danger: { icon: "◉"},
    no: { icon: "✦"},
};


export default function Home() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleScan = async () => {
        if (!url.trim()) return;
        setResult(null);
        setLoading(true);

        try {
            const res = await analyzeUrl(url);
            setResult(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleScan();
    };

    const handleClear = () => {
        setUrl("");
        setResult(null);
        inputRef.current?.focus();
    };

    return (
        <div className="app-wrapper">
            {/* Header */}
            <header className="header">
                <div className="header__eyebrow">Threat Intelligence</div>
                <h1 className="header__title" style={{fontFamily:'sans-serif'}}>
                    Phisherman<br /><span>Detector</span>
                </h1>
                <p className="header__subtitle">
                    Analyze any URL for phishing indicators instantly
                </p>
            </header>

            {/* Main card */}
            <div className="card" style={{fontFamily:'sans-serif'}}>
                <div className="search-group">
                    {/* Input row */}
                    <div className="input-row">
                        <span className="input-icon">⬡</span>
                        <input
                            ref={inputRef}
                            className="url-input"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="https://example.com/path?query=..."
                            spellCheck={false}
                            autoComplete="off"
                        />
                        {url && (
                            <button className="clear-btn" onClick={handleClear} title="Clear">
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Scan button */}
                    <button
                        className={`scan-btn${loading ? " loading" : ""}`}
                        onClick={handleScan}
                        disabled={!url.trim() || loading}
                        style={{fontFamily:'sans-serif'}}
                    >
                        {loading ? (
                            <><span className="spinner" />Scanning…</>
                        ) : (
                            "Scan URL"
                        )}
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className={`result-panel ${result.status}`} >
                        {/* Verdict */}
                        <div className="verdict-row">
                            <div className="verdict-icon">{VERDICT_META[result.status].icon}</div>
                            <div>
                                <div className="verdict-label">{result.verdict}</div>
                                <div className="verdict-desc">{result.desc}</div>
                            </div>
                        </div>

                        {/* Risk score bar */}
                        <div className="score-row">
                            <div className="score-label">Risk Score</div>
                            <div className="score-track">
                                <div
                                    className="score-fill"
                                    style={{ width: `${result.riskScore}%` }}
                                />
                            </div>
                            <div className="score-pct">{result.riskScore}%</div>
                        </div>

                    </div>
                )}
            </div>

            {/* Footer hints */}
            <div className="hints">
                <span className="hint"><span className="hint-dot safe" />Safe</span>
                <span className="hint"><span className="hint-dot warning" />Suspicious</span>
                <span className="hint"><span className="hint-dot danger" />Phishing Risk</span>
            </div>
        </div>
    );
}