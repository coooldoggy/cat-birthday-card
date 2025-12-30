import { useEffect, useState } from "react";

export default function PawProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / h) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="paw-progress">
      <div className="paw-progress-fill" style={{ height: `${progress}%` }} />
      <span>🐾</span>
    </div>
  );
}
