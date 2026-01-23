import { useState, useEffect } from "react";

// 실제 존재하는 JPG 파일만 사용
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
  "/img/IMG_8935.jpg"
];

export default function PhotoCarousel() {
  const [i, setI] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 자동 슬라이드 기능
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setI((prevI) => {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
        return (prevI + 1) % photos.length;
      });
    }, 4000); // 4초마다 자동으로 넘김

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const changePhoto = (direction: number) => {
    if (isTransitioning) return;
    setIsAutoPlaying(false); // 수동 조작 시 자동 재생 중지
    setIsTransitioning(true);
    setTimeout(() => {
      setI((i + direction + photos.length) % photos.length);
      setIsTransitioning(false);
    }, 200);
  };

  const goToPhoto = (idx: number) => {
    if (isTransitioning) return;
    setIsAutoPlaying(false); // 수동 조작 시 자동 재생 중지
    setIsTransitioning(true);
    setTimeout(() => {
      setI(idx);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section style={{ padding: '0', textAlign: 'center' }} className="fade-in invitation-section">
      <h2 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '1rem',
        color: '#3d2a1a',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Comfortaa', sans-serif",
        letterSpacing: '0.05em'
      }}>
        📸 추억 사진
      </h2>
      <div className="carousel-container" style={{ margin: 0, padding: '1.5rem' }}>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <img 
            src={photos[i]} 
            alt={`추억 ${i + 1}`}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '400px',
              margin: '0 auto',
              borderRadius: '1rem',
              objectFit: 'cover',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 3px #1a1a1a',
              border: '3px solid #3d2a1a',
              opacity: isTransitioning ? 0.7 : 1,
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.4s ease'
            }}
            onError={(e) => {
              // 이미지 로드 실패 시 다음 이미지로 자동 이동
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              setTimeout(() => {
                setI((i + 1) % photos.length);
              }, 100);
            }}
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(250, 248, 243, 0.95)',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#1a1a1a',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: '2px solid #1a1a1a'
          }}>
            {i + 1} / {photos.length}
          </div>
          {isAutoPlaying && (
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(26, 26, 26, 0.7)',
              color: '#faf8f3',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              자동 재생 중
            </div>
          )}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => changePhoto(-1)}
            style={{
              fontSize: '1.5rem',
              padding: '0.75rem 1.25rem',
              minWidth: '60px'
            }}
            aria-label="이전 사진"
          >
            ◀
          </button>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            {photos.map((_, idx) => (
              <div
                key={idx}
                onClick={() => goToPhoto(idx)}
                style={{
                  width: idx === i ? '14px' : '10px',
                  height: idx === i ? '14px' : '10px',
                  borderRadius: '50%',
                  background: idx === i ? '#1a1a1a' : '#8b4513',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: idx === i ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              />
            ))}
          </div>
          <button 
            onClick={() => changePhoto(1)}
            style={{
              fontSize: '1.5rem',
              padding: '0.75rem 1.25rem',
              minWidth: '60px'
            }}
            aria-label="다음 사진"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
