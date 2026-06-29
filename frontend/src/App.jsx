import { useState } from "react";

const API_URL = "http://127.0.0.1:5000/predict";

export default function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (review.trim().length < 10) {
      setError("Please enter a review with at least 10 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("API se connect nahi ho pa raha. Flask server chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setReview("");
    setResult(null);
    setError("");
  };

  const isPositive = result?.sentiment === "positive";

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎬 Sentiment Analyser</h1>
        <p style={styles.subtitle}>
          Paste a movie review — AI will detect if it's Positive or Negative
        </p>
      </div>

      {/* Input Card */}
      <div style={styles.card}>
        <label style={styles.label}>Movie Review</label>
        <textarea
          style={styles.textarea}
          placeholder="Type or paste your movie review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={6}
        />
        <div style={styles.charCount}>
          {review.length} characters · {review.trim().split(/\s+/).filter(Boolean).length} words
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.buttonRow}>
          <button
            style={styles.clearBtn}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            style={{
              ...styles.analyzeBtn,
              opacity: loading ? 0.7 : 1,
            }}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analysing..." : "Analyse Sentiment →"}
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div style={{
          ...styles.resultCard,
          borderLeft: `5px solid ${isPositive ? "#22c55e" : "#ef4444"}`,
          background: isPositive ? "#f0fdf4" : "#fef2f2",
        }}>
          <div style={styles.sentimentRow}>
            <span style={styles.emoji}>{isPositive ? "😊" : "😞"}</span>
            <div>
              <div style={styles.sentimentLabel}>Sentiment</div>
              <div style={{
                ...styles.sentimentValue,
                color: isPositive ? "#16a34a" : "#dc2626",
              }}>
                {result.sentiment.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Confidence Bar */}
          <div style={styles.confidenceSection}>
            <div style={styles.confidenceHeader}>
              <span style={styles.confidenceLabel}>Confidence</span>
              <span style={styles.confidencePercent}>{result.confidence}%</span>
            </div>
            <div style={styles.progressBg}>
              <div style={{
                ...styles.progressFill,
                width: `${result.confidence}%`,
                background: isPositive ? "#22c55e" : "#ef4444",
              }} />
            </div>
          </div>

          <div style={styles.wordCount}>
            📝 Review length: {result.review_length} words
          </div>
        </div>
      )}

      <div style={styles.footer}>
        Powered by Logistic Regression + TF-IDF · 89% Accuracy · ROC-AUC 0.95
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    color: "#ffffff",
    fontSize: "2.2rem",
    fontWeight: "700",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "1rem",
    margin: 0,
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    width: "100%",
    maxWidth: "680px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "10px",
    fontSize: "0.95rem",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    fontSize: "0.95rem",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    color: "#1e293b",
    boxSizing: "border-box",
    transition: "border 0.2s",
  },
  charCount: {
    textAlign: "right",
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "6px",
    marginBottom: "16px",
  },
  errorBox: {
    background: "#fef2f2",
    color: "#dc2626",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    marginBottom: "16px",
    border: "1px solid #fecaca",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  clearBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #e2e8f0",
    background: "white",
    color: "#64748b",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  analyzeBtn: {
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  resultCard: {
    background: "#f0fdf4",
    borderRadius: "16px",
    padding: "28px",
    width: "100%",
    maxWidth: "680px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    marginBottom: "20px",
  },
  sentimentRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  emoji: { fontSize: "2.5rem" },
  sentimentLabel: {
    color: "#64748b",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  sentimentValue: {
    fontSize: "1.8rem",
    fontWeight: "800",
  },
  confidenceSection: { marginBottom: "16px" },
  confidenceHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  confidenceLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: "500",
  },
  confidencePercent: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  progressBg: {
    height: "10px",
    background: "#e2e8f0",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "99px",
    transition: "width 0.6s ease",
  },
  wordCount: {
    fontSize: "0.85rem",
    color: "#64748b",
    marginTop: "12px",
  },
  footer: {
    color: "#475569",
    fontSize: "0.8rem",
    marginTop: "12px",
  },
};