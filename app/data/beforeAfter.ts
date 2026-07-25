export type BeforeAfterItem = {
  id: number;
  title: string;
  titleZh: string;
  image: string;
  description: string;
  descriptionZh: string;
};

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Stove Deep Clean",
    titleZh: "炉灶深度清洁",
    image: "/images/before-after/beforeAfter1.jpg",
    description:
      "Grease, burnt residue, and built-up grime removed to restore a clean and hygienic cooking surface.",
    descriptionZh: "去除油污、烧焦残留和长期积垢，让烹饪表面恢复干净卫生。",
  },
  {
    id: 2,
    title: "Kitchen Refresh",
    titleZh: "厨房整理清洁",
    image: "/images/before-after/beforeAfter2.jpg",
    description:
      "Grease, dust, and surface mess cleaned away to restore a neat and hygienic kitchen space.",
    descriptionZh: "清理油污、灰尘和台面杂乱，让厨房空间更整洁卫生。",
  },
  {
    id: 3,
    title: "Shower Glass Clean",
    titleZh: "浴室玻璃清洁",
    image: "/images/before-after/beforeAfter3.jpg",
    description:
      "Built-up water marks and residue cleared away for a cleaner, brighter shower finish.",
    descriptionZh: "清除水渍和残留污垢，让淋浴玻璃更明亮干净。",
  },
];
