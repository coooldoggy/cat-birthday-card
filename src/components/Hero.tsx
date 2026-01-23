import birthday from "@/assets/data/birthday.json";

export default function Hero() {
  const formattedDate = new Date(birthday.date).toLocaleDateString('ko-KR', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric',
    weekday: 'long'
  });
  
  const formattedTime = new Date(birthday.date).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section className="hero-container fade-in invitation-hero">
      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        {/* Decorative top border */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #1a1a1a 20%, #1a1a1a 80%, transparent)',
          opacity: 0.3
        }}></div>

        {/* Invitation Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '1.2rem',
            letterSpacing: '0.3em',
            color: '#3d2a1a',
            fontWeight: '400',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            fontFamily: "'Comfortaa', sans-serif"
          }}>
            초대합니다
          </div>
        </div>

        {/* Cat Photo with decorative frame */}
        <div style={{
          position: 'relative',
          marginBottom: '2rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            border: '2px dashed #8b4513',
            borderRadius: '50%',
            opacity: 0.4,
            animation: 'float 4s ease-in-out infinite'
          }}></div>
          <img 
            src="/img/IMG_1068.JPG" 
            alt={birthday.name}
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: 
                '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 4px #faf8f3, 0 0 0 6px #3d2a1a, 0 0 0 10px #faf8f3',
              border: '4px solid #1a1a1a',
              animation: 'float 4s ease-in-out infinite',
              position: 'relative',
              zIndex: 2
            }}
          />
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            fontSize: '2.5rem',
            animation: 'sparkle 2s ease-in-out infinite',
            animationDelay: '0.5s',
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
            zIndex: 3
          }}>✨</div>
          <div style={{
            position: 'absolute',
            bottom: '-15px',
            left: '-15px',
            fontSize: '2rem',
            animation: 'sparkle 2s ease-in-out infinite',
            animationDelay: '1s',
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
            zIndex: 3
          }}>🎈</div>
        </div>

        {/* Birthday Name and Age */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            lineHeight: '1.2',
            color: '#1a1a1a',
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: '700',
            letterSpacing: '0.05em'
          }}>
            {birthday.name}의 {birthday.age}번째 생일
          </h1>
        </div>

        {/* Date and Time */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(250, 248, 243, 0.6)',
          borderRadius: '1rem',
          border: '2px dashed #8b4513',
          position: 'relative',
          width: '100%',
          maxWidth: '500px'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#faf8f3',
            padding: '0 1rem',
            fontSize: '0.9rem',
            color: '#3d2a1a',
            fontWeight: '600',
            letterSpacing: '0.1em'
          }}>
            📅 파티 일정
          </div>
          <div style={{
            fontSize: '1.1rem',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            fontWeight: '600',
            fontFamily: "'Comfortaa', sans-serif"
          }}>
            {formattedDate}
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#3d2a1a',
            marginBottom: '0.5rem'
          }}>
            {formattedTime} 시작
          </div>
          <div style={{
            fontSize: '0.95rem',
            color: '#8b4513',
            fontStyle: 'italic'
          }}>
            장소: {birthday.location}
          </div>
        </div>

        {/* Invitation Message from Cat */}
        <div style={{
          fontSize: '1rem',
          width: '100%',
          maxWidth: '600px',
          color: '#2c2c2c',
          lineHeight: '1.8',
          background: 'linear-gradient(135deg, rgba(250, 248, 243, 0.98) 0%, rgba(245, 240, 232, 0.95) 100%)',
          padding: '2rem 1.5rem',
          borderRadius: '1rem',
          boxShadow: 
            '0 6px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          border: '3px solid #1a1a1a',
          position: 'relative',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif"
        }}>
          {/* Decorative corner elements */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '20px',
            height: '20px',
            borderTop: '2px solid #8b4513',
            borderLeft: '2px solid #8b4513',
            opacity: 0.5
          }}></div>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '20px',
            height: '20px',
            borderTop: '2px solid #8b4513',
            borderRight: '2px solid #8b4513',
            opacity: 0.5
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            width: '20px',
            height: '20px',
            borderBottom: '2px solid #8b4513',
            borderLeft: '2px solid #8b4513',
            opacity: 0.5
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '20px',
            height: '20px',
            borderBottom: '2px solid #8b4513',
            borderRight: '2px solid #8b4513',
            opacity: 0.5
          }}></div>

          <div style={{
            fontSize: '1.1rem',
            color: '#1a1a1a',
            marginBottom: '1rem',
            fontWeight: '600',
            fontStyle: 'italic'
          }}>
            🐱 {birthday.name}의 말
          </div>
          <p style={{ 
            margin: 0, 
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#2c2c2c',
            lineHeight: '1.9'
          }}>
            안녕하세요! 저는 {birthday.name}입니다 🐾<br/>
            제 {birthday.age}번째 생일을 맞이하게 되어<br/>
            여러분을 초대하고 싶어요!<br/><br/>
            함께 축하해 주시면 정말 기쁠 것 같아요.<br/>
            많은 분들이 와주셔서 즐거운 시간을 보내요! 💕
          </p>
        </div>

        {/* Decorative bottom border */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #1a1a1a 20%, #1a1a1a 80%, transparent)',
          opacity: 0.3
        }}></div>
      </div>
    </section>
  );
}
