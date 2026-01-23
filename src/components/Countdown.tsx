import { useEffect, useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function Countdown() {
  const [text, setText] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const d = new Date(birthday.date).getTime() - Date.now();
      if (d <= 0) {
        setText("🎂 생일이에요!");
        setIsBirthday(true);
      } else {
        const days = Math.floor(d / 86400000);
        const hours = Math.floor((d % 86400000) / 3600000);
        const minutes = Math.floor((d % 3600000) / 60000);
        const seconds = Math.floor((d % 60000) / 1000);
        
        if (days > 0) {
          setText(`파티까지 ${days}일 남았어요! 🎉`);
        } else if (hours > 0) {
          setText(`파티까지 ${hours}시간 ${minutes}분 남았어요! ⏰`);
        } else if (minutes > 0) {
          setText(`파티까지 ${minutes}분 ${seconds}초 남았어요! ⏰`);
        } else {
          setText(`파티까지 ${seconds}초 남았어요! ⏰`);
        }
        setIsBirthday(false);
      }
    };
    
    updateCountdown();
    const t = setInterval(updateCountdown, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="countdown-container fade-in invitation-section" style={{ margin: 0, padding: '1rem' }}>
      <div style={{
          fontSize: '0.75rem',
          color: '#8b4513',
          fontWeight: '600',
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          ⏰ 파티까지
        </div>
      <p style={{
        fontSize: isBirthday ? '1.1rem' : '0.95rem',
        fontWeight: '700',
        color: isBirthday ? '#1a1a1a' : '#3d2a1a',
        margin: 0,
        textShadow: isBirthday ? '0 2px 10px rgba(26, 26, 26, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        letterSpacing: '0.3px',
        textAlign: 'center',
        fontFamily: "'Comfortaa', sans-serif",
        lineHeight: '1.4'
      }}>
        {text}
      </p>
    </div>
  );
}
