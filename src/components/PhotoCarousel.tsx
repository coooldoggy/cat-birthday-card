import { useState } from "react";
const photos = ["/img/cat-1.jpg", "/img/cat-2.jpg", "/img/cat-hero.jpg"];

export default function PhotoCarousel() {
  const [i, setI] = useState(0);
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-6">📸 Memories</h2>
      <img src={photos[i]} className="w-64 h-64 mx-auto rounded-2xl shadow-lg object-cover" />
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={() => setI((i + photos.length - 1) % photos.length)}>◀</button>
        <button onClick={() => setI((i + 1) % photos.length)}>▶</button>
      </div>
    </section>
  );
}
