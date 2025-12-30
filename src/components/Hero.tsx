import birthday from "@/assets/data/birthday.json";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-pink-50 rounded-b-[3rem] px-6">
      <img src="/img/cat-hero.jpg" className="w-52 h-52 rounded-full shadow-xl mb-8" />
      <h1 className="text-4xl font-bold mb-3">
        🎉 {birthday.name} is turning {birthday.age}!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        {new Date(birthday.date).toDateString()}
      </p>
      <p className="text-xl max-w-md">{birthday.message}</p>
    </section>
  );
}
