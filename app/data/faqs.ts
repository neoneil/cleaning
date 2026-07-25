export type FaqItem = {
  question: string;
  answer: string;
  questionZh: string;
  answerZh: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What cleaning services do you provide in Melbourne?",
    answer:
      "We provide residential cleaning services including regular house cleaning, deep cleaning, apartment cleaning, end of lease cleaning, and move in or move out cleaning.",
    questionZh: "你们在墨尔本提供哪些清洁服务？",
    answerZh:
      "我们提供住宅清洁服务，包括定期家庭清洁、深度清洁、公寓清洁、退租清洁，以及搬入/搬出清洁。",
  },
  {
    question: "Do you offer end of lease cleaning?",
    answer:
      "Yes. We offer detailed end of lease cleaning for rental handovers, with attention to kitchens, bathrooms, floors, surfaces, and areas property managers commonly inspect.",
    questionZh: "你们做退租清洁吗？",
    answerZh:
      "做。我们提供细致的退租清洁，会重点处理厨房、浴室、地面、台面以及中介常检查的区域。",
  },
  {
    question: "Which Melbourne suburbs do you service?",
    answer:
      "We commonly service Melbourne's south-east and eastern suburbs, including Berwick, Glen Waverley, Clayton, Dandenong, Moorabbin, Bentleigh, and nearby areas.",
    questionZh: "你们服务墨尔本哪些区域？",
    answerZh:
      "我们常服务墨尔本东南区和东区，包括 Berwick、Glen Waverley、Clayton、Dandenong、Moorabbin、Bentleigh 以及附近区域。",
  },
  {
    question: "Do I need to upload photos when requesting a quote?",
    answer:
      "Photos are optional, but they help us understand the property condition and provide a faster, clearer cleaning estimate.",
    questionZh: "申请报价时一定要上传照片吗？",
    answerZh:
      "照片不是必须，但能帮助我们更好了解房屋情况，从而更快给出清楚的清洁报价。",
  },
  {
    question: "Can I book a regular weekly or fortnightly clean?",
    answer:
      "Yes. We can arrange regular weekly or fortnightly cleaning depending on your home, routine, and preferred schedule.",
    questionZh: "可以预约每周或每两周定期清洁吗？",
    answerZh:
      "可以。我们可以根据您的家庭情况、日常安排和偏好时间，安排每周或每两周的定期清洁。",
  },
];
