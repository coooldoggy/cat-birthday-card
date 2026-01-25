import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "gallery", "guestbook", "gift-policy"] as const;
export type ActiveSection = (typeof SECTION_IDS)[number];

const TOP_OFFSET = 120;

export function useActiveSection() {
  const [active, setActive] = useState<ActiveSection>("hero");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sections = SECTION_IDS.map((id) => ({
          id,
          el: document.getElementById(id),
        })).filter((s): s is { id: ActiveSection; el: HTMLElement } => !!s.el);

        let current: ActiveSection = "hero";
        for (const { id, el } of sections) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= TOP_OFFSET) current = id;
        }
        setActive(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}
