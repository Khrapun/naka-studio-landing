import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/assetPath";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAKA Studio — детейлинг и защита автомобиля в Минске",
  description:
    "Оклейка, антикоррозийная обработка, тонировка и детейлинг автомобиля в NAKA Studio. Запишитесь на удобное время в Минске.",
  openGraph: {
    title: "NAKA Studio — детейлинг и защита автомобиля",
    description: "Профессиональный уход за автомобилем в Минске.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body style={{ "--circuit-url": `url(${assetPath("/assets/circuit.svg")})` } as CSSProperties}>{children}</body>
    </html>
  );
}
