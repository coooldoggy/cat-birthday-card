import birthday from "@/assets/data/birthday.json";

export default function Footer() {
  return (
    <footer className="site-footer site-footer-guestbook">
      <div className="footer-inner-guestbook">
        <div className="footer-icons">
          <span className="material-symbols-outlined">celebration</span>
          <span className="material-symbols-outlined">cake</span>
          <span className="material-symbols-outlined">toys</span>
        </div>
        <p className="footer-location">장소: {birthday.location}</p>
        <p className="footer-copy">Powered by Paw-ty Invites © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
