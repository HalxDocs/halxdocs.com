import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignaturePad from "../components/SignaturePad";

const API = "https://us-central1-fitness-gym-fc040.cloudfunctions.net/guestbook";

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
      const cached = localStorage.getItem('guestbookEntries');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch {}
    return true;
  });

  const API = "https://us-central1-fitness-gym-fc040.cloudfunctions.net/guestbook";

  useEffect(() => {
    let isMounted = true;
    let hasCache = false;
    
    // Load from localStorage immediately if available
    try {
      const cached = localStorage.getItem('guestbookEntries');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasCache = true;
          setEntries(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse guestbook cache:', e);
    }
    
    const fetchEntries = async () => {
      try {
        // Only show loading spinner if we have no cached entries to show
        if (!hasCache) setLoading(true);
        const res = await fetch(API, { 
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!isMounted) return;
        
        const data = await res.json();
        if (isMounted) {
          if (data.ok) {
            const fetchedEntries = data.entries || [];
            setEntries(fetchedEntries);
            // Save to localStorage
            try {
              localStorage.setItem('guestbookEntries', JSON.stringify(fetchedEntries));
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
    if (!name.trim()) return;
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), signature }),
      });
      const data = await res.json();
       if (data.ok) {
            setSuccess("Done!");
            const savedName = name.trim();
            const savedMsg = message.trim();
            setName("");
            setMessage("");
            setSignature(null);
            const newEntry = { id: data.id, name: savedName, message: savedMsg, signature, createdAt: new Date().toISOString() };
            setEntries(prev => {
              const updated = [newEntry, ...prev];
              try {
                localStorage.setItem('guestbookEntries', JSON.stringify(updated));
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
    <section style={{ maxWidth: 680, margin: "0 auto", padding: "130px 24px 64px", color: "var(--text)" }}>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
        <Link to="/" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>Home</Link>
        <span style={{ margin: "0 8px", opacity: 0.3 }}>/</span>
        Guestbook
      </p>

      <p style={{ fontSize: 22, fontWeight: 600, fontFamily: "'Fraunces', serif", marginBottom: 8, letterSpacing: "-0.01em" }}>
        Guestbook
      </p>
      <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
        Sign your name, leave a note, or both.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={60}
            style={{
              padding: "10px 14px",
              fontSize: 14,
              borderRadius: 8,
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
              padding: "10px 14px",
              fontSize: 14,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
          <SignaturePad onChange={setSignature} />
        </div>

        {error && <p style={{ fontSize: 13, color: "#ef4444", marginBottom: 10 }}>{error}</p>}
        {success && <p style={{ fontSize: 13, color: "#22c55e", marginBottom: 10 }}>{success}</p>}

        <button
          type="submit"
          disabled={sending || !name.trim()}
          style={{
            padding: "10px 22px",
            borderRadius: 100,
            background: sending || !name.trim() ? "var(--border)" : "var(--text)",
            color: sending || !name.trim() ? "var(--text-muted)" : "var(--bg)",
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            cursor: sending || !name.trim() ? "not-allowed" : "pointer",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => { if (!sending && name.trim()) e.currentTarget.style.opacity = "0.75"; }}
          onMouseLeave={e => { if (!sending && name.trim()) e.currentTarget.style.opacity = "1"; }}
        >
          {sending ? "Sending..." : "Sign"}
        </button>
      </form>

       {loading && entries.length === 0 && (
         <p style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", padding: 40, opacity: 0.8 }}>
           Loading entries...
         </p>
       )}
       {!loading && entries.length === 0 && (
         <p style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", padding: 40, opacity: 0.6 }}>No entries yet. Be the first.</p>
       )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {entries.map(entry => (
          <div key={entry.id} style={{
            padding: "16px 20px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: entry.signature || entry.message ? 8 : 0 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{entry.name}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)", opacity: 0.5 }}>
                {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            {entry.signature && (
              <img src={entry.signature} alt={`${entry.name}'s signature`} style={{ maxWidth: 200, height: "auto", opacity: 0.85, marginBottom: entry.message ? 8 : 0 }} />
            )}
            {entry.message && <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)", margin: 0, whiteSpace: "pre-wrap" }}>{entry.message}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
