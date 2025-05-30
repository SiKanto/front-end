// File: src/components/MapSection.tsx
export default function MapSection() {
  return (
    <section className="px-10 py-16">
      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded-full">
          🔍 Find place to visit
        </button>
        <div className="flex items-center gap-2">
          <select className="border px-3 py-2 rounded">
            <option>Filter place by</option>
          </select>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Apply Filter</button>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1&hl=en"
          width="100%"
          height="400"
          loading="lazy"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </section>
  );
}