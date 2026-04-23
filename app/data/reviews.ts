export type Review = {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah",
    location: "Berwick",
    rating: 5,
    text: "Very reliable and detail-focused. The house looked fresh and spotless after every visit. Highly recommended.",
  },
  {
    id: 2,
    name: "Jason",
    location: "Narre Warren",
    rating: 5,
    text: "Easy communication, always on time, and the cleaning quality was excellent. We were very happy with the service.",
  },
  {
    id: 3,
    name: "Emily",
    location: "Clyde North",
    rating: 5,
    text: "Professional, friendly, and thorough. They paid attention to the small details that many cleaners miss.",
  },
];