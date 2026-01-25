import { useState, useEffect } from "react";

const photos = [
  "/img/IMG_6354.JPG",
  "/img/IMG_6357.JPG",
  "/img/IMG_6360.JPG",
  "/img/IMG_0541.JPG",
  "/img/IMG_0610.JPG",
  "/img/IMG_0702.JPG",
  "/img/IMG_0829.jpg",
  "/img/IMG_0853.JPG",
  "/img/IMG_0857.JPG",
  "/img/IMG_0875.JPG",
  "/img/IMG_0918.JPG",
  "/img/IMG_1068.JPG",
  "/img/IMG_1167.JPG",
  "/img/IMG_1169.JPG",
  "/img/IMG_4797.JPG",
  "/img/IMG_4816.JPG",
  "/img/IMG_5818.JPG",
  "/img/IMG_6330.jpg",
  "/img/IMG_6379.JPG",
  "/img/IMG_6571.JPG",
  "/img/IMG_6703.JPG",
  "/img/IMG_6714.JPG",
  "/img/IMG_6811.JPG",
  "/img/IMG_7079.JPG",
  "/img/IMG_7574.JPG",
  "/img/IMG_8510.JPG",
  "/img/IMG_8516.JPG",
  "/img/IMG_8793.JPG",
  "/img/IMG_8935.jpg",
];

export default function PhotoCarousel() {
  const [i, setI] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setI((prev) => {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
        return (prev + 1) % photos.length;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const changePhoto = (direction: number) => {
    if (isTransitioning) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setI((prev) => (prev + direction + photos.length) % photos.length);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section id="gallery" className="gallery-section">
      <h2 className="gallery-title">📸 추억 사진</h2>
      <div className="gallery-card">
        <div className="gallery-img-wrap">
          <img
            src={photos[i]}
            alt={`추억 ${i + 1}`}
            className="gallery-img"
            style={{
              opacity: isTransitioning ? 0.85 : 1,
              transform: isTransitioning ? "scale(0.98)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              setTimeout(() => setI((prev) => (prev + 1) % photos.length), 100);
            }}
          />
        </div>
        <div className="gallery-nav">
          <button type="button" onClick={() => changePhoto(-1)} aria-label="이전 사진">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="gallery-counter">
            {i + 1} / {photos.length}
          </span>
          <button type="button" onClick={() => changePhoto(1)} aria-label="다음 사진">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}
