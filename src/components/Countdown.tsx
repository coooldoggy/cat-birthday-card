import { useEffect, useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function Countdown() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date(birthday.date).getTime() - Date.now();
      if (d <= 0) {
        setIsPast(true);
        setDiff({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setIsPast(false);
      setDiff({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        mins: Math.floor((d % 3600000) / 60000),
        secs: Math.floor((d % 60000) / 1000),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  if (isPast) {
    return (
      <section className="countdown-section">
        <h2 className="countdown-title">🎂 생일이에요!</h2>
        <p className="countdown-subtitle">함께 축하해 주세요</p>
      </section>
    );
  }

  return (
    <section className="countdown-section">
      <h2 className="countdown-title">카운트다운</h2>
      <p className="countdown-subtitle">케익 놓치지 마세요!</p>
      <div className="countdown-grid">
        <div className="countdown-cell">
          <div className="countdown-value">{String(diff.days).padStart(2, "0")}</div>
          <div className="countdown-label">일</div>
        </div>
        <div className="countdown-cell">
          <div className="countdown-value">{String(diff.hours).padStart(2, "0")}</div>
          <div className="countdown-label">시간</div>
        </div>
        <div className="countdown-cell">
          <div className="countdown-value">{String(diff.mins).padStart(2, "0")}</div>
          <div className="countdown-label">분</div>
        </div>
        <div className="countdown-cell">
          <div className="countdown-value">{String(diff.secs).padStart(2, "0")}</div>
          <div className="countdown-label">초</div>
        </div>
      </div>
    </section>
  );
}
