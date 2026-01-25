import birthday from "@/assets/data/birthday.json";
import { useActiveSection, type ActiveSection } from "@/hooks/useActiveSection";

const NAV: { href: string; section: ActiveSection; label: string }[] = [
  { href: "#hero", section: "hero", label: "홈" },
  { href: "#gallery", section: "gallery", label: "갤러리" },
  { href: "#guestbook", section: "guestbook", label: "방명록" },
  { href: "#gift-policy", section: "gift-policy", label: "선물함" },
];

export default function Header() {
  const title = `${birthday.name}의 생일 파티! 🐾`;
  const activeSection = useActiveSection();

  return (
    <header className="site-header site-header-guestbook">
      <div className="site-header-inner">
        <a href="#hero" className="site-logo site-logo-guestbook">
          <span className="icon-paw">
            <span className="material-symbols-outlined">pets</span>
          </span>
          <span>{title}</span>
        </a>
        <nav className="site-nav">
          {NAV.map(({ href, section, label }) => (
            <a
              key={section}
              href={href}
              className={activeSection === section ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </nav>
        <div
          className="site-profile-img"
          style={{ backgroundImage: 'url("/img/IMG_1068.JPG")' }}
          role="img"
          aria-label={`${birthday.name} 프로필`}
        />
      </div>
    </header>
  );
}
