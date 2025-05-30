// File: src/components/RecommendationSection.tsx
import PlaceCard from "./PlaceCard.tsx";

const dummyPlaces = new Array(6).fill({
  name: "Name Place",
  location: "Location Place",
  rating: 4.5
});

export default function RecommendationSection() {
  return (
    <section className="py-16 px-10">
      <h2 className="text-3xl font-bold text-red-600 mb-1">What you might like</h2>
      <p className="text-gray-600 mb-6">Based on your survey result</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {dummyPlaces.map((place, i) => (
          <PlaceCard key={i} {...place} />
        ))}
      </div>
    </section>
  );
}