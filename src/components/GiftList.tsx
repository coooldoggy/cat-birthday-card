import { useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function GiftList() {
  const [checked, setChecked] = useState<boolean[]>(
    birthday.gifts.map(() => false)
  );

  const confetti = (x: number, y: number) => {
    for (let i = 0; i < 20; i++) {
      const e = document.createElement("div");
      e.className = "confetti";
      e.innerText = ["🎉", "✨", "💖", "🎈", "🎊", "⭐"][i % 6];
      e.style.left = x + (Math.random() - 0.5) * 60 + "px";
      e.style.top = y + "px";
      e.style.fontSize = (16 + Math.random() * 8) + "px";
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 1200);
    }
  };

  const allChecked = checked.every(c => c);

  return (
    <section style={{ padding: '0', textAlign: 'center' }} className="fade-in invitation-section">
      <h2 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '0.5rem',
        color: '#3d2a1a',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Comfortaa', sans-serif",
        letterSpacing: '0.05em'
      }}>
        🎁 선물 아이디어
      </h2>
      <div style={{
        fontSize: '0.85rem',
        color: '#8b4513',
        marginBottom: '1rem',
        fontStyle: 'italic',
        letterSpacing: '0.05em'
      }}>
        Gift Ideas
      </div>
      <div style={{
        width: '100%',
        background: 'rgba(250, 248, 243, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '1rem',
        boxShadow: 
          '0 8px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        border: '2px solid #1a1a1a'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {birthday.gifts.map((gift, i) => (
            <li 
              key={i} 
              className={`gift-item ${checked[i] ? 'checked' : ''}`}
              style={{
                textAlign: 'left',
                transition: 'all 0.3s ease',
                padding: '0.75rem 1rem',
                marginBottom: 0
              }}
            >
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={(e) => {
                  if (!checked[i]) {
                    const r = e.currentTarget.getBoundingClientRect();
                    confetti(r.left + r.width / 2, r.top + r.height / 2);
                  }
                  setChecked(v => v.map((x, j) => (j === i ? !x : x)));
                }}
                style={{ flexShrink: 0 }}
              />
              <span style={{
                fontSize: '0.9rem',
                textDecoration: checked[i] ? 'line-through' : 'none',
                opacity: checked[i] ? 0.6 : 1,
                color: checked[i] ? '#8b4513' : '#2c2c2c',
                transition: 'all 0.3s ease',
                flex: 1,
                fontWeight: checked[i] ? '400' : '500'
              }}>
                {gift}
              </span>
              {checked[i] && (
                <span style={{
                  fontSize: '1.2rem',
                  color: '#1a1a1a',
                  animation: 'sparkle 1s ease-in-out',
                  fontWeight: 'bold'
                }}>✓</span>
              )}
            </li>
          ))}
        </ul>
        {allChecked && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, rgba(61, 42, 26, 0.2) 0%, rgba(139, 69, 19, 0.15) 100%)',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            color: '#1a1a1a',
            fontWeight: '600',
            animation: 'fadeIn 0.5s ease-out',
            border: '2px solid #3d2a1a',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}>
            🎉 All gifts checked! {birthday.name} will be so happy! 🎉
          </div>
        )}
      </div>
    </section>
  );
}
