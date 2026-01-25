import { useState, useEffect, useCallback } from "react";
import birthday from "@/assets/data/birthday.json";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const AVATAR_ICONS = ["person", "favorite", "child_care", "pets"];

function confetti() {
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.innerText = ["🎉", "✨", "💖", "🎈", "🎊", "⭐"][i % 6];
    el.style.left = Math.random() * 100 + "%";
    el.style.top = "-10px";
    el.style.fontSize = 16 + Math.random() * 8 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

export default function GuestBook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("메시지를 불러오지 못했어요.");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 났어요.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const formatTime = (ts: number) => {
    const now = Date.now();
    const diff = now - ts;
    if (diff < 3600000) return "방금 전";
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
    if (diff < 172800000) return "어제";
    return new Date(ts).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);
    setShowSuccess(false);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "저장에 실패했어요.");
      }
      const newMsg = await res.json();
      setMessages((prev) => [newMsg, ...prev]);
      setName("");
      setMessage("");
      setError(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      confetti();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("메시지를 삭제할까요?")) return;
    try {
      const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setError("삭제에 실패했어요.");
    }
  };

  return (
    <div id="guestbook" className="guestbook-page">
      <div className="guestbook-headline">
        <h1 className="guestbook-headline-title">
          {birthday.name}에게 축하 메시지를 남겨주세요!
        </h1>
        <p className="guestbook-headline-sub">
          {birthday.name}의 {birthday.age}번째 생일을 축하하는 따뜻한 한마디를 기다려요.
        </p>
      </div>

      <div className="guestbook-main">
        <div className="guestbook-card-single">
          <div className="guestbook-card-header">
            <div className="guestbook-card-title-wrap">
              <span className="material-symbols-outlined guestbook-icon">chat</span>
              <h2 className="guestbook-card-title">축하 메시지</h2>
            </div>
            <span className="guestbook-badge">{messages.length}개의 메시지</span>
          </div>

          {error && (
            <p className="guestbook-error" style={{ marginBottom: "1rem", color: "#c00", fontSize: "0.9rem" }}>
              {error}
            </p>
          )}

          <div className="guestbook-messages">
            {loading ? (
              <p className="guestbook-empty">불러오는 중…</p>
            ) : messages.length === 0 ? (
              <p className="guestbook-empty">아직 메시지가 없어요. 첫 축하 메시지를 남겨주세요! 💕</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`guestbook-msg ${idx % 2 === 1 ? "reverse" : ""}`}
                  onDoubleClick={() => handleDelete(msg.id)}
                >
                  <div className={`guestbook-msg-avatar ${idx % 2 === 1 ? "accent-pink" : ""}`}>
                    <span className="material-symbols-outlined">
                      {AVATAR_ICONS[idx % AVATAR_ICONS.length]}
                    </span>
                  </div>
                  <div className="guestbook-msg-bubble">
                    <p className="guestbook-msg-name">{msg.name}</p>
                    <p className="guestbook-msg-text">{msg.message}</p>
                    <span className="guestbook-msg-time">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="guestbook-form-wrap">
            {showSuccess && (
              <p className="guestbook-success">✅ 메시지가 저장되었어요!</p>
            )}
            <form onSubmit={handleSubmit} className="guestbook-form">
              <input
                type="text"
                className="guestbook-input"
                placeholder="성함을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="guestbook-textarea-wrap">
                <textarea
                  className="guestbook-textarea"
                  placeholder={`${birthday.name}를 위한 축하 메시지를 남겨주세요...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                />
                <button
                  type="submit"
                  className="guestbook-send-btn"
                  disabled={isSubmitting || !message.trim()}
                  aria-label="보내기"
                >
                  <span className="material-symbols-outlined">pets</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div id="gift-policy" className="gift-policy-block">
          <div className="gift-policy-inner">
            <h3 className="gift-policy-title">선물 안내</h3>
            <p className="gift-policy-text">
              선물은 정중히 사양합니다! 여러분의 참석과 {birthday.name}를 향한 사랑만으로도 충분합니다.
            </p>
          </div>
          <span className="material-symbols-outlined gift-policy-deco">card_giftcard</span>
        </div>
      </div>
    </div>
  );
}
