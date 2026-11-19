import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { API_BASE } from "../lib/api";

const STORAGE_KEY = "halxdocs:visitor-id";

function getVisitorId() {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export default function LikeButton({ slug }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({
      slug,
      visitorId: getVisitorId(),
    });

    fetch(`${API_BASE}/api/portfolio/blog/likes?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setCount(data.likes ?? 0);
        setLiked(Boolean(data.liked));
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  async function toggle() {
    if (busy || loading) return;
    setBusy(true);

    const previousCount = count;
    const previousLiked = liked;
    const nextLiked = !liked;

    setLiked(nextLiked);
    setCount(Math.max(0, previousCount + (nextLiked ? 1 : -1)));

    try {
      const res = await fetch(`${API_BASE}/api/portfolio/blog/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, visitorId: getVisitorId() }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setCount(data.likes ?? 0);
      setLiked(Boolean(data.liked));
      setFailed(false);
    } catch {
      setCount(previousCount);
      setLiked(previousLiked);
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="like-block">
      <button
        type="button"
        className={`like-btn${liked ? " liked" : ""}`}
        onClick={toggle}
        disabled={loading}
        aria-pressed={liked}
        aria-label={liked ? "Unlike this post" : "Like this post"}
      >
        <Heart size={15} strokeWidth={1.75} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
      <div className="like-count" aria-live="polite">
        {failed
          ? "Likes unavailable"
          : loading
            ? "…"
            : `${count} ${count === 1 ? "like" : "likes"}`}
      </div>
    </div>
  );
}
