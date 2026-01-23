import Hero from "@/components/Hero";
import PhotoCarousel from "@/components/PhotoCarousel";
import PawProgress from "@/components/PawProgress";
import GuestBook from "@/components/GuestBook";
import birthday from "@/assets/data/birthday.json";

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <main style={{ 
        maxWidth: '900px', 
        width: '100%',
        margin: '0 auto', 
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '2rem'
      }}>
        <PawProgress />
        <div style={{ gridColumn: '1 / -1', position: 'relative', zIndex: 2 }}>
          <Hero />
        </div>
        {/* Party Activities Section */}
        <div style={{ gridColumn: '1 / -1', position: 'relative', zIndex: 2, marginTop: '1rem' }}>
          <section className="invitation-section fade-in" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '0.5rem',
              color: '#3d2a1a',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              fontFamily: "'Comfortaa', sans-serif",
              letterSpacing: '0.05em'
            }}>
              🎊 파티 프로그램
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              background: 'rgba(250, 248, 243, 0.95)',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '2px solid #1a1a1a',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}>
              {birthday.activities.map((activity, i) => (
                <div
                  key={i}
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 240, 232, 0.8) 0%, rgba(250, 248, 243, 0.9) 100%)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px dashed #8b4513',
                    fontSize: '0.95rem',
                    color: '#2c2c2c',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {activity}
                </div>
              ))}
            </div>
          </section>
        </div>
        <div style={{ position: 'relative', zIndex: 2, gridColumn: '1 / -1' }}>
          <PhotoCarousel />
        </div>
        <div style={{ gridColumn: '1 / -1', position: 'relative', zIndex: 2 }}>
          <GuestBook />
        </div>
        {/* Decorative corner elements - Invitation style */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          width: '40px',
          height: '40px',
          borderTop: '3px solid #8b4513',
          borderLeft: '3px solid #8b4513',
          opacity: 0.4,
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          width: '40px',
          height: '40px',
          borderTop: '3px solid #8b4513',
          borderRight: '3px solid #8b4513',
          opacity: 0.4,
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          left: '0.5rem',
          width: '40px',
          height: '40px',
          borderBottom: '3px solid #8b4513',
          borderLeft: '3px solid #8b4513',
          opacity: 0.4,
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.5rem',
          width: '40px',
          height: '40px',
          borderBottom: '3px solid #8b4513',
          borderRight: '3px solid #8b4513',
          opacity: 0.4,
          zIndex: 1
        }}></div>
      </main>
    </div>
  );
}
