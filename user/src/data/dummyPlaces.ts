export interface Place {
  id: string;
  name: string;
  city: string;
  location: string;
  openingHours: string;
  closingHours: string;
  description: string;
  category: string;
  visitor: number;
  price: string;
  facilities: string[];
  rating: number;
  lat: number;
  lon: number;
  imageURL: string;
}
