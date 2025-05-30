// File: src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative">
      <img src="/hero.jpg" alt="Beach" className="w-full h-[600px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-center items-start px-16 text-white">
        <h1 className="text-5xl font-bold max-w-xl leading-tight">
          Welcome, <span className="text-red-400">adventure is more comfortable if we know where the destination is</span>
        </h1>
        <button className="mt-6 px-4 py-2 bg-white text-red-600 rounded-full font-semibold">🎯 Take Survey</button>
      </div>
    </section>
  );
}