// File: src/components/PlaceCard.tsx
import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-solar/star-bold";
import pinIcon from "@iconify/icons-solar/map-point-bold";

export default function PlaceCard({ name, location, rating }: any) {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden shadow p-4">
      <div className="w-full h-32 bg-gray-300 rounded mb-3"></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{name}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Icon icon={pinIcon} className="w-4 h-4 mr-1" /> {location}
          </div>
        </div>
        <div className="bg-red-600 text-white px-2 py-0.5 rounded-full text-sm flex items-center">
          <Icon icon={starIcon} className="w-4 h-4 mr-1" /> {rating}
        </div>
      </div>
    </div>
  );
}