import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import PhotoCarousel from "@/components/PhotoCarousel";
import GiftList from "@/components/GiftList";
import PawProgress from "@/components/PawProgress";

export default function Home() {
  return (
    <main className="max-w-md mx-auto">
      <PawProgress />
      <Hero />
      <Countdown />
      <PhotoCarousel />
      <GiftList />
    </main>
  );
}
