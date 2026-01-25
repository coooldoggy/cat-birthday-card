import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import Schedule from "@/components/Schedule";
import PhotoCarousel from "@/components/PhotoCarousel";
import GuestBook from "@/components/GuestBook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-full">
        <div className="main-inner">
          <section className="fade-in" style={{ paddingTop: "1.5rem" }}>
            <Hero />
          </section>
          <Countdown />
          <EventDetails />
          <Schedule />
          <PhotoCarousel />
          <GuestBook />
        </div>
      </main>
      <Footer />
    </div>
  );
}
