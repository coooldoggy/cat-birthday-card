import { useEffect, useState } from "react";
import birthday from "@/assets/data/birthday.json";

export default function Countdown() {
  const [text, setText] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date(birthday.date).getTime() - Date.now();
      if (d <= 0) setText("🎂 It’s my birthday!");
      else setText(`${Math.floor(d / 86400000)} days left`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return <p className="text-center text-2xl py-10">{text}</p>;
}
