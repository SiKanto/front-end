// File: src/components/PlaceCard.tsx

import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-solar/star-bold";
import pinIcon from "@iconify/icons-solar/map-point-bold";
import "../styles/place-card.css";
import type { Place } from "../data/dummyPlaces";

interface Props extends Place {
  id: string;
  name: string;
  city: string;
  rating: number;
  imageURL: string;
  onClick?: () => void;
}

export default function PlaceCard({ name, city, rating, imageURL, onClick }: Props) {
  return (
    <div className="place-card" onClick={onClick}>
      <div className="place-image">
        <img src={imageURL} alt={name} />
      </div>

      <div className="place-body">
        <div className="place-info">
          <p className="place-name">{name}</p>
          <div className="place-location">
            <Icon icon={pinIcon} className="icon" />
            {city}
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