import birthday from "@/assets/data/birthday.json";

export default function Hero() {
  const title = `${birthday.name}의 ${birthday.age}번째 생일 파티`;
  const subtitle = birthday.message || "함께 축하해 주세요! 🐾";

  return (
    <section
      id="hero"
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%), url("/img/Gemini_Generated_Image_883stz883stz883s.png")`,
      }}
    >
      <span className="hero-badge">초대합니다!</span>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <a href="#guestbook" className="btn-primary hero-cta">
        방명록 쓰기
      </a>
      <span className="hero-paw material-symbols-outlined">pets</span>
    </section>
  );
}
