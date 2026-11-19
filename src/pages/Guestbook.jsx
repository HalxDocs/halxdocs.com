import { useState, useEffect } from "react";
import SignaturePad from "../components/SignaturePad";
import SignatureImage from "../components/SignatureImage";
import { API_BASE } from "../lib/api";

const API = `${API_BASE}/api/portfolio/guestbook`;

// Client-side moderation — the backend has no filter, so we drop abuse here.
const BLOCKED = [
  "spam", "spammy", "spamming",
  "sex", "porn", "nude", "naked", "masterbate", "masturbate", "fuck", "shit", "bitch", "slut", "whore", "dick", "cock", "pussy", "cum", "xxx", "modi",
];

function isClean(text) {
  const t = (text || "").toLowerCase();
  return !BLOCKED.some((w) => t.includes(w));
}

function validEntry(e) {
  const name = (e.name || "").trim();
  if (name.length < 2) return false;
  if (!isClean(name)) return false;
  if (e.message && !isClean(e.message)) return false;
  return true;
}

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('guestbookEntries_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch {
      // cache read is best-effort
    }
    return true;
  });

  useEffect(() => {
    let isMounted = true;
    let hasCache = false;

    // Load from localStorage immediately if available
    try {
      const cached = localStorage.getItem('guestbookEntries_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasCache = true;
          setEntries(parsed.filter(validEntry));
        }
      }
    } catch (e) {
      console.warn('Failed to parse guestbook cache:', e);
    }

    const fetchEntries = async () => {
      try {
        if (!hasCache) setLoading(true);
        const res = await fetch(API, { cache: "no-store" });
        if (!isMounted) return;

        const data = await res.json();
        if (isMounted) {
          if (data.ok) {
            const fetchedEntries = (data.entries || []).filter(validEntry);
            setEntries(fetchedEntries);
            try {
              localStorage.setItem('guestbookEntries_v3', JSON.stringify(fetchedEntries));
            } catch (e) {
              console.warn('Failed to save guestbook to localStorage:', e);
            }
            setError("");
          } else {
            setError(data.error || "Failed to load entries");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load guestbook. Please try again.");
          console.error("Guestbook fetch error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    if (cleanName.length < 2 || !isClean(cleanName) || (message.trim() && !isClean(message))) {
      setError("Please keep entries respectful and add a valid name.");
      return;
    }
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, message: message.trim(), signature }),
      });
      const data = await res.json();
       if (data.ok) {
            setSuccess("Done!");
            const savedMsg = message.trim();
            setName("");
            setMessage("");
            setSignature(null);
            const newEntry = { id: data.id, name: cleanName, message: savedMsg, signature, createdAt: new Date().toISOString() };
            setEntries(prev => {
              const updated = [newEntry, ...prev];
              try {
                localStorage.setItem('guestbookEntries_v3', JSON.stringify(updated));
              } catch (e) {
                console.warn('Failed to save guestbook to localStorage:', e);
              }
              return updated;
            });
          } else {
            setError(data.error || "Something went wrong");
          }
    } catch {
      setError("Network error");
    }
    setSending(false);
  }

  return (
    <section style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 64px", color: "var(--text)" }}>
      <h1 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 4 }}>
        Guestbook
      </h1>
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 28 }}>
        Sign your name, leave a note, or both.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={60}
            style={{
              padding: "9px 12px",
              fontSize: 13,
              borderRadius: 3,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <textarea
            placeholder="Write something (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={500}
            rows={2}
            style={{
              padding: "9px 12px",
              fontSize: 13,
              borderRadius: 3,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.55,
            }}
          />
          <SignaturePad onChange={setSignature} />
        </div>

        {error && <p style={{ fontSize: 12.5, color: "var(--text)", marginBottom: 10 }}>{error}</p>}
        {success && <p style={{ fontSize: 12.5, color: "var(--text)", marginBottom: 10, fontWeight: 600 }}>{success}</p>}

        <button
          type="submit"
          disabled={sending || !name.trim()}
          style={{
            padding: "8px 18px",
            borderRadius: 3,
            background: sending || !name.trim() ? "var(--border)" : "var(--text)",
            color: sending || !name.trim() ? "var(--text-muted)" : "var(--bg)",
            fontSize: 12.5,
            fontWeight: 500,
            border: "none",
            cursor: sending || !name.trim() ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { if (!sending && name.trim()) e.currentTarget.style.opacity = "0.75"; }}
          onMouseLeave={e => { if (!sending && name.trim()) e.currentTarget.style.opacity = "1"; }}
        >
          {sending ? "Sending..." : "Sign"}
        </button>
      </form>

       {loading && entries.length === 0 && (
         <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: 32, opacity: 0.8 }}>
           Loading entries...
         </p>
       )}
       {!loading && entries.length === 0 && (
         <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: 32, opacity: 0.6 }}>No entries yet. Be the first.</p>
       )}

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {entries.map(entry => (
          <div key={entry.id} style={{
            padding: "14px 0",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: entry.signature || entry.message ? 6 : 0 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text)" }}>{entry.name}</span>
              <span className="font-mono" style={{ fontSize: 10, color: "var(--text-dim)" }}>
                {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            {entry.signature && (
              <SignatureImage src={entry.signature} alt={`${entry.name}'s signature`} style={{ maxWidth: 160, height: "auto", opacity: 0.85, marginBottom: entry.message ? 6 : 0 }} />
            )}
            {entry.message && <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: 0, whiteSpace: "pre-wrap" }}>{entry.message}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
