// File: src/components/PlaceCard.tsx

import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-solar/star-bold";
import pinIcon from "@iconify/icons-solar/map-point-bold";
import "../styles/place-card.css";
import type { Place } from "../data/dummyPlaces";

interface Props extends Place {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  onClick?: () => void;
}

export default function PlaceCard({ name, location, rating, image, onClick }: Props) {
   return (
    <div className="place-card" onClick={onClick}>
      <div className="place-image">
        <img src={image} alt={name} />
      </div>

      <div className="place-body">
        <div className="place-info">
          <p className="place-name">{name}</p>
          <div className="place-location">
            <Icon icon={pinIcon} className="icon" />
            {location}
          </div>
        </div>

        <div className="place-rating">
          <Icon icon={starIcon} className="icon" />
          {rating}
        </div>
      </div>
    </div>
  );
}