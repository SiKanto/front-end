// src/data/dummyPlaces.ts

export type Place = {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: number;
  openHour: string;
  price: string;
  description: string;
  lat: number;
  lng: number;
  category: "Restaurant" | "Cafe" | "Mall" | "Attractions" | "Beach";
};

export const dummyPlaces: Place[] = [
  {
    id: "1",
    name: "Pantai Sembilan",
    location: "Gili Genting, Sumenep",
    rating: 4.8,
    openHour: "24 Jam",
    price: "Rp15.000",
    description: "Pantai dengan pasir putih dan air laut jernih, cocok untuk snorkeling dan bermain kano.",
    category: "Beach",
    lat: -7.0486,
    lng: 113.9604,
    image: "https://asset.kompas.com/crops/sJEMNKwLa_5rbm3DCgdJchRpaxk=/78x0:923x563/750x500/data/photo/2023/08/24/64e71af850df7.jpg"
  },
  {
    id: "2",
    name: "Gili Labak",
    location: "Sumenep",
    rating: 4.9,
    openHour: "24 Jam",
    price: "Rp25.000",
    description: "Pulau kecil dengan pasir putih dan terumbu karang indah, ideal untuk diving dan snorkeling.",
    category: "Beach",
    lat: -7.0846,
    lng: 114.0403,
    image: "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/sumenep/gili-labak.jpg"
  },
  {
    id: "3",
    name: "Bukit Jaddih",
    location: "Bangkalan",
    rating: 4.5,
    openHour: "08:00 - 17:00",
    price: "Rp10.000",
    description: "Bekas tambang kapur yang kini menjadi destinasi wisata dengan pemandangan tebing putih yang eksotis.",
    category: "Attractions",
    lat: -7.0421,
    lng: 112.7498,
    image: "https://www.nativeindonesia.com/wp-content/uploads/2018/11/Bukit-Jaddih.jpg"
  },
  {
    id: "4",
    name: "Masjid Agung Sumenep",
    location: "Sumenep",
    rating: 4.7,
    openHour: "24 Jam",
    price: "Gratis",
    description: "Masjid bersejarah dengan arsitektur perpaduan Jawa, Cina, dan Eropa, dibangun pada abad ke-18.",
    category: "Attractions",
    lat: -7.0051,
    lng: 113.8626,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Masjid_Agung_Sumenep.jpg"
  },
  {
    id: "5",
    name: "Air Terjun Toroan",
    location: "Sampang",
    rating: 4.6,
    openHour: "07:00 - 17:00",
    price: "Rp5.000",
    description: "Air terjun yang langsung mengalir ke laut, menawarkan pemandangan unik dan menenangkan.",
    category: "Attractions",
    lat: -6.9771,
    lng: 113.1975,
    image: "https://www.nativeindonesia.com/wp-content/uploads/2018/11/Air-Terjun-Toroan.jpg"
  },
  {
    id: "6",
    name: "Bebek Sinjay",
    location: "Bangkalan",
    rating: 4.8,
    openHour: "07:00 - 17:00",
    price: "Rp25.000",
    description: "Restoran terkenal dengan menu bebek goreng dan sambal pencit khas Madura.",
    category: "Restaurant",
    lat: -7.0429,
    lng: 112.7456,
    image: "https://akcdn.detik.net.id/community/media/visual/2023/10/20/warung-bebek-sinjay-1_169.jpeg?w=700&q=90"
  },
  {
    id: "7",
    name: "Kopi Kelud Bangkalan",
    location: "Bangkalan",
    rating: 4.5,
    openHour: "08:00 - 23:00",
    price: "Rp15.000 - Rp30.000",
    description: "Kafe dengan berbagai varian kopi unik dan suasana nyaman untuk bersantai.",
    category: "Cafe",
    lat: -7.0352,
    lng: 112.7489,
    image: "https://www.traveloka.com/en-id/explore/wp-content/uploads/sites/4/2022/09/Kopi-Kelud-Bangkalan.jpg"
  },
  {
    id: "8",
    name: "Pantai Rongkang",
    location: "Bangkalan",
    rating: 4.4,
    openHour: "06:00 - 18:00",
    price: "Rp5.000",
    description: "Pantai dengan batuan karang unik dan pemandangan laut yang indah, cocok untuk fotografi.",
    category: "Beach",
    lat: -7.0612,
    lng: 112.7923,
    image: "https://www.nativeindonesia.com/wp-content/uploads/2018/11/Pantai-Rongkang.jpg"
  },
  {
    id: "9",
    name: "Bukit Arosbaya",
    location: "Bangkalan",
    rating: 4.3,
    openHour: "07:00 - 17:00",
    price: "Rp10.000",
    description: "Bukit dengan formasi batu kapur berwarna merah muda, menawarkan pemandangan yang eksotis.",
    category: "Attractions",
    lat: -7.0435,
    lng: 112.7480,
    image: "https://www.nativeindonesia.com/wp-content/uploads/2018/11/Bukit-Arosbaya.jpg"
  },
  {
    id: "10",
    name: "Pantai Siring Kemuning",
    location: "Bangkalan",
    rating: 4.2,
    openHour: "06:00 - 18:00",
    price: "Rp5.000",
    description: "Pantai dengan pasir putih kecokelatan dan air laut biru kehijauan, cocok untuk bersantai.",
    category: "Beach",
    lat: -7.0045,
    lng: 112.7492,
    image: "https://www.nativeindonesia.com/wp-content/uploads/2018/11/Pantai-Siring-Kemuning.jpg"
  }
];
