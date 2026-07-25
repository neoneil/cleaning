export type Review = {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  textZh: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah",
    location: "Berwick",
    rating: 5,
    text: "Very reliable and detail-focused. The house looked fresh and spotless after every visit. Highly recommended.",
    textZh: "非常可靠，也很注重细节。每次清洁后家里都很清爽干净，值得推荐。",
  },
  {
    id: 2,
    name: "Jason",
    location: "Narre Warren",
    rating: 5,
    text: "Easy communication, always on time, and the cleaning quality was excellent. We were very happy with the service.",
    textZh: "沟通很顺畅，每次都准时，清洁质量也很好。我们对服务非常满意。",
  },
  {
    id: 3,
    name: "Emily",
    location: "Clyde North",
    rating: 5,
    text: "Professional, friendly, and thorough. They paid attention to the small details that many cleaners miss.",
    textZh: "专业、友好，也很细致。很多容易忽略的小地方他们都会认真处理。",
  },
];
