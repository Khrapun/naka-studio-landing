import { CarFront, Clock3, Paintbrush, ShieldCheck, Sparkles, Sun, Wrench, Droplets, SprayCan, Brush, Layers3, Gem, type LucideIcon } from "lucide-react";

export type Feature = { icon: LucideIcon; title: string; description?: string };
export type Service = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  features: Feature[];
};

export const services: Service[] = [
  {
    id: "wrap",
    eyebrow: "ОКЛЕЙКА",
    title: "АВТОМОБИЛЯ",
    description: "Профессиональная оклейка кузова защитными и цветными плёнками. Защита от сколов, царапин и ультрафиолета. Широкий выбор материалов: винил, полиуретан, карбон, текстурные плёнки. Индивидуальный дизайн и стайлинг.",
    image: "/assets/wrap.jpg",
    imageAlt: "Автомобиль в защитной плёнке в студии NAKA",
    features: [
      { icon: CarFront, title: "ЗАЩИТА КУЗОВА" },
      { icon: Paintbrush, title: "ИЗМЕНЕНИЕ ЦВЕТА" },
      { icon: Clock3, title: "ДОЛГОВЕЧНОСТЬ" },
    ],
  },
  {
    id: "anticorrosion",
    eyebrow: "АНТИКОРРОЗИЙНАЯ",
    title: "ОБРАБОТКА",
    description: "Комплексная антикоррозийная обработка кузова, днища и скрытых полостей. Защита от ржавчины, солей, реагентов и влаги. Использование высококачественных материалов: мастик, восков, преобразователей. Долговечная защита вашего автомобиля.",
    image: "/assets/anticorrosion.jpg",
    imageAlt: "Антикоррозийная обработка днища автомобиля на подъёмнике",
    features: [
      { icon: Wrench, title: "ОБРАБОТКА ДНИЩА" },
      { icon: SprayCan, title: "ЗАЩИТА ПОЛОСТЕЙ" },
      { icon: ShieldCheck, title: "УСТОЙЧИВОСТЬ К РЖАВЧИНЕ" },
    ],
  },
  {
    id: "tint",
    eyebrow: "ТОНИРОВКА",
    title: "СТЕКОЛ",
    description: "Профессиональная тонировка стёкол автомобиля для защиты от солнца, приватности и улучшения внешнего вида. Варианты полиуретановой плёнки для стёкол также в наличии. Высококачественные материалы и долговечный результат.",
    image: "/assets/tint.jpg",
    imageAlt: "Тонированный автомобиль в студии NAKA",
    features: [
      { icon: Sun, title: "ЗАЩИТА ОТ СОЛНЦА" },
      { icon: Layers3, title: "ПРИВАТНОСТЬ" },
      { icon: ShieldCheck, title: "УСТОЙЧИВОСТЬ И ПРОЧНОСТЬ" },
    ],
  },
  {
    id: "detailing",
    eyebrow: "ДЕТЕЙЛИНГ",
    title: "УХОД",
    image: "/assets/detailing.jpg",
    imageAlt: "Мастер наносит защитное покрытие на автомобиль",
    features: [
      { icon: SprayCan, title: "ХИМЧИСТКА:", description: "Глубокая очистка салона от пятен и запахов." },
      { icon: Sparkles, title: "ПОЛИРОВКА:", description: "Восстановление блеска и удаление царапин." },
      { icon: Droplets, title: "МОЙКА:", description: "Бережная мойка кузова с премиум-средствами." },
      { icon: Brush, title: "ЧИСТКА КУЗОВА:", description: "Удаление битума, реагентов и грязи." },
      { icon: ShieldCheck, title: "КЕРАМИЧЕСКОЕ ПОКРЫТИЕ:", description: "Долговечная защита и гидрофобный эффект." },
      { icon: Gem, title: "ВОСКОВОЕ ПОКРЫТИЕ:", description: "Защита и блеск с натуральным воском." },
    ],
  },
];

export const reviews = [
  { name: "Иван П.", date: "05.06.2024", text: "Детейлинг впечатляет отличной и стабильной работой. Использованные материалы и антикоррозийная обработка — на высоте. Это действительно качественный сервис. Очень рекомендую!" },
  { name: "Елена С.", date: "05.06.2024", text: "Детейлинг, полировка и антикоррозийная обработка — всё сделано тщательно. Друзья порекомендовали эту студию, и теперь я тоже советую её знакомым." },
  { name: "Алексей К.", date: "05.04.2024", text: "Детейлинг и антикоррозийная обработка выполнены профессионально. Понравились внимание к деталям и отношение команды. Спасибо!" },
];
