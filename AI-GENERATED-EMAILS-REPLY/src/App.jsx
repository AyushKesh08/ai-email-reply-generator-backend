
import { useState } from "react";
import axios from "axios";
import "./App.css";

const tones = [
  "Professional",
  "Friendly",
  "Polite",
  "Casual",
  "Formal",
  "Apologetic",
];

function App() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate AI Reply
  const generateReply = async () => {
    if (!email.trim()) {
      setError("Please paste an email first.");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const url = "https://ai-email-reply-generator-backend-deploy.onrender.com/api/email/generate";

      const response = await axios.post(url, {
        emailContent: email,
        tone: tone,
      });

      setReply(response.data);

    } catch (err) {
      console.log("Error:", err);
      console.log("Response:", err.response?.data);
      console.log("Status:", err.response?.status);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to generate reply."
      );

    } finally {
      setLoading(false);
    }
  };

  // Copy Generated Reply
  const copyReply = async () => {
    try {
      await navigator.clipboard.writeText(reply);
    } catch (err) {
      console.log("Copy failed:", err);
      setError("Unable to copy reply.");
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">✉</span>
          Reply<span>Buddy</span>
        </div>

        <div className="nav-tag">
          AI POWERED EMAIL ASSISTANT
        </div>
      </nav>

      <main className="main-container">

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            ✦ YOUR PERSONAL AI WRITING ASSISTANT
          </div>

          <h1>
            Emails made <span>effortless.</span>
          </h1>

          <p>
            Turn your emails into thoughtful replies in seconds.
            Choose your tone and let AI do the writing.
          </p>
        </section>

        {/* Workspace */}
        <section className="workspace">

          {/* Original Email */}
          <div className="editor-panel">

            <div className="panel-heading">
              <div>
                <span className="step">01</span>
                <h2>Original Email</h2>
              </div>

              <span className="panel-label">INPUT</span>
            </div>

            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Paste the email you received here..."
            />

            <div className="editor-footer">
              <span>{email.length} characters</span>

              <button
                className="clear-btn"
                onClick={() => {
                  setEmail("");
                  setError("");
                }}
              >
                Clear text
              </button>
            </div>

            {/* Tone Selection */}
            <div className="tone-section">
              <label>Select your reply tone</label>

              <div className="tone-options">
                {tones.map((item) => (
                  <button
                    key={item}
                    className={`tone-btn ${
                      tone === item ? "active" : ""
                    }`}
                    onClick={() => setTone(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              className="generate-btn"
              onClick={generateReply}
              disabled={loading}
            >
              {loading ? "Generating..." : "✦ Generate Reply"}
              {!loading && <span>→</span>}
            </button>

            {error && <p className="error">{error}</p>}

          </div>

          {/* Generated Reply */}
          <div className="reply-panel">

            <div className="panel-heading">
              <div>
                <span className="step">02</span>
                <h2>AI Generated Reply</h2>
              </div>

              <span className="ai-label">✦ AI OUTPUT</span>
            </div>

            <div className="reply-content">

              {loading ? (
                <div className="loading">
                  <div className="loader"></div>
                  <p>Crafting your perfect reply...</p>
                </div>

              ) : reply ? (
                <p className="generated-text">{reply}</p>

              ) : (
                <div className="empty-state">
                  <div className="empty-icon">✉</div>

                  <h3>Your reply will appear here</h3>

                  <p>
                    Paste an email, select your preferred tone
                    and click Generate Reply.
                  </p>
                </div>
              )}

            </div>

            <div className="reply-footer">
              <span>
                {reply
                  ? "Reply generated successfully"
                  : "Waiting for input..."}
              </span>

              <button
                className="copy-btn"
                onClick={copyReply}
                disabled={!reply}
              >
                ▢ Copy Reply
              </button>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer>
          <span>✦ Powered by AI</span>
          <span>Made with ♥ ReplyBuddy</span>
        </footer>

      </main>
    </div>
  );
}

export default App;
