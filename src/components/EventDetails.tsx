import { useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function EventDetails() {
  const [copied, setCopied] = useState(false);
  const d = new Date(birthday.date);
  const dateStr = d.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
  const timeStr = d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const weekday = d.toLocaleDateString("ko-KR", { weekday: "long" });

  const handleCopyLocation = async () => {
    try {
      await navigator.clipboard.writeText(birthday.location);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = birthday.location;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="details-grid">
      <div className="detail-card">
        <div className="icon-wrap">
          <span className="material-symbols-outlined">calendar_today</span>
        </div>
        <div>
          <div className="detail-label">날짜</div>
          <div className="detail-value">{dateStr}</div>
          <div className="detail-meta">{weekday}</div>
        </div>
      </div>
      <div className="detail-card">
        <div className="icon-wrap">
          <span className="material-symbols-outlined">schedule</span>
        </div>
        <div>
          <div className="detail-label">시간</div>
          <div className="detail-value">{timeStr}</div>
          <div className="detail-meta">시작</div>
        </div>
      </div>
      <div className="detail-card" onClick={handleCopyLocation} style={{ cursor: "pointer" }}>
        <div className="icon-wrap">
          <span className="material-symbols-outlined">location_on</span>
        </div>
        <div>
          <div className="detail-label">장소</div>
          <div className="detail-value" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {birthday.location}
            {copied ? (
              <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>
                ✓ 복사됨!
              </span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: "1rem", opacity: 0.6 }}>
                content_copy
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
