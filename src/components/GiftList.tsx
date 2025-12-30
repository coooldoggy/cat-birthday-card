import { useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function GiftList() {
  const [checked, setChecked] = useState<boolean[]>(
    birthday.gifts.map(() => false)
  );

  const confetti = (x: number, y: number) => {
    for (let i = 0; i < 12; i++) {
      const e = document.createElement("div");
      e.className = "confetti";
      e.innerText = ["🎉", "✨", "💖"][i % 3];
      e.style.left = x + Math.random() * 30 + "px";
      e.style.top = y + "px";
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 1200);
    }
  };

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-6">🎁 Gift Ideas</h2>
      <ul className="inline-block text-left space-y-4">
        {birthday.gifts.map((gift, i) => (
          <li key={i} className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={(e) => {
                if (!checked[i]) {
                  const r = e.currentTarget.getBoundingClientRect();
                  confetti(r.left, r.top);
                }
                setChecked(v => v.map((x, j) => (j === i ? !x : x)));
              }}
            />
            <span className={checked[i] ? "line-through opacity-50" : ""}>
              {gift}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
