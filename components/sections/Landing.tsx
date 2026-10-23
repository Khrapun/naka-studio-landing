"use client";

import Image from "next/image";
import { CarFront, ShieldCheck, Sparkles, ArrowUpRight, MapPin, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useContactDialog, ContactDialog } from "@/components/ui/ContactDialog";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollAtmosphere } from "@/components/animations/ScrollAtmosphere";
import { reviews, services, type Service, type Feature } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";

function ActionButton({ onClick, children, secondary = false }: { onClick: () => void; children: React.ReactNode; secondary?: boolean }) {
  return <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className={`button ${secondary ? "button-outline" : "button-primary"}`} onClick={onClick}>{children}</motion.button>;
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return <div className="feature-card"><Icon size={28} strokeWidth={1.25} aria-hidden="true" /><strong>{feature.title}</strong>{feature.description && <span>{feature.description}</span>}</div>;
}

function ServiceSection({ service, onContact }: { service: Service; onContact: (service: string) => void }) {
  const isDetailing = service.id === "detailing";
  return <section className={`stage service-stage ${isDetailing ? "detailing-stage" : ""}`} id={service.id} aria-labelledby={`${service.id}-title`}>
    <div className="stage-inner two-column">
      <div className="stage-copy">
        <Reveal><h2 className="display-title service-title" id={`${service.id}-title`}><em>{service.eyebrow}</em><span>{service.title}</span></h2></Reveal>
        {service.description && <Reveal delay={0.08}><div className="service-description"><h3>ОПИСАНИЕ УСЛУГИ:</h3><p>{service.description}</p></div></Reveal>}
        <Reveal delay={0.14}><div className={`features ${isDetailing ? "features-six" : ""}`}>{service.features.map((feature) => <FeatureCard feature={feature} key={feature.title} />)}</div></Reveal>
        <Reveal delay={0.2}><div className="section-actions"><ActionButton onClick={() => onContact(`${service.eyebrow} ${service.title}`)}>ЗАПИСАТЬСЯ</ActionButton><a className="button button-outline" href="#about">ПРИМЕРЫ РАБОТ</a></div></Reveal>
      </div>
      <Reveal className="photo-wrap" delay={0.12}><div className="photo-frame"><Image data-parallax src={assetPath(service.image)} alt={service.imageAlt} fill sizes="(max-width: 800px) 100vw, 45vw" className="section-photo" /></div></Reveal>
    </div>
  </section>;
}

export function Landing() {
  const contact = useContactDialog();
  const reduced = useReducedMotion();
  return <>
    <Header onContact={() => contact.openFor()} />
    <ScrollAtmosphere />
    <main>
      <section className="stage hero-stage" id="home" aria-labelledby="hero-title">
        <div className="stage-inner two-column hero-inner">
          <div className="stage-copy hero-copy">
            <motion.h1 className="display-title hero-title" id="hero-title" initial={reduced ? false : "hidden"} animate="visible" variants={{ visible: { transition: { staggerChildren: 0.14 } } }}>
              <motion.em variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>NAKA</motion.em>
              <motion.span variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>STUDIO</motion.span>
            </motion.h1>
            <Reveal delay={0.24}><div className="hero-services">
              <a className="hero-service selected" href="#wrap"><CarFront aria-hidden="true" size={27} strokeWidth={1.4} />ОКЛЕЙКА</a>
              <a className="hero-service" href="#anticorrosion"><ShieldCheck aria-hidden="true" size={27} strokeWidth={1.4} />АНТИКОР</a>
              <a className="hero-service" href="#tint"><ShieldCheck aria-hidden="true" size={27} strokeWidth={1.4} />ТОНИРОВКА</a>
              <a className="hero-service" href="#detailing"><Sparkles aria-hidden="true" size={27} strokeWidth={1.4} />ДЕТЕЙЛИНГ<br />УХОД</a>
            </div></Reveal>
            <Reveal delay={0.34}><ActionButton onClick={() => contact.openFor()}>ЗАПИСАТЬСЯ</ActionButton></Reveal>
          </div>
          <Reveal className="photo-wrap hero-photo-wrap" delay={0.25}><div className="photo-frame hero-photo"><Image src={assetPath("/assets/detailing.jpg")} alt="Детейлинг автомобиля в студии NAKA" fill priority sizes="(max-width: 800px) 100vw, 45vw" className="section-photo" /></div></Reveal>
        </div>
        <a className="scroll-cue" href="#wrap" aria-label="Перейти к услугам"><span>ЛИСТАЙТЕ ВНИЗ</span><span className="cue-line" /></a>
      </section>
      {services.map((service) => <ServiceSection key={service.id} service={service} onContact={contact.openFor} />)}

      <section className="stage about-stage" id="about" aria-labelledby="about-title">
        <div className="stage-inner about-inner">
          <Reveal><h2 id="about-title" className="section-heading">О СТУДИИ NAKA</h2></Reveal>
          <Reveal delay={0.07}><p className="about-text">Мы — профессиональная студия детейлинга NAKA, увлечённая качеством и деталями. С момента основания мы стремимся предоставлять лучшие услуги по уходу за автомобилями в Беларуси. Наша команда — это опытные мастера, использующие премиальные материалы и передовые технологии для достижения безупречного результата. Ваша машина — наша страсть!</p></Reveal>
          <Reveal delay={0.14}><ActionButton onClick={() => contact.openFor()}>ЗАПИСАТЬСЯ</ActionButton></Reveal>
          <Reveal className="collage-wrap" delay={0.18}><Image src={assetPath("/assets/studio-collage.jpg")} alt="Команда NAKA и автомобили в студии детейлинга" width={1760} height={430} sizes="(max-width: 800px) 100vw, 85vw" /></Reveal>
        </div>
      </section>

      <section className="stage locations-stage" id="locations" aria-labelledby="locations-title">
        <div className="stage-inner locations-inner">
          <Reveal><h2 id="locations-title" className="section-heading">НАШИ ЛОКАЦИИ</h2></Reveal>
          <div className="location-grid">
            <Reveal delay={0.08}><a className="location-card" href="https://www.google.com/maps/search/?api=1&query=4-%D0%B9%20%D0%91%D1%80%D0%B5%D1%81%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%2C%2026%2C%20%D0%9C%D0%B8%D0%BD%D1%81%D0%BA" target="_blank" rel="noopener noreferrer"><strong>ДЕТЕЙЛИНГ<br />СТУДИЯ</strong><span>4-й Брестский переулок, 26</span><MapPin size={30} fill="currentColor" aria-hidden="true" /><ArrowUpRight className="location-arrow" size={24} aria-hidden="true" /></a></Reveal>
            <Reveal delay={0.14}><a className="location-card" href="https://www.google.com/maps/search/?api=1&query=%D0%A1%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%201%D0%96%2C%20%D0%9C%D0%B8%D0%BD%D1%81%D0%BA" target="_blank" rel="noopener noreferrer"><strong>АНТИКОРРОЗИЙНАЯ<br />ОБРАБОТКА</strong><span>Серова 1Ж</span><MapPin size={30} fill="currentColor" aria-hidden="true" /><ArrowUpRight className="location-arrow" size={24} aria-hidden="true" /></a></Reveal>
          </div>
        </div>
      </section>

      <section className="stage reviews-stage" id="reviews" aria-labelledby="reviews-title">
        <div className="stage-inner reviews-inner">
          <Reveal><h2 id="reviews-title" className="section-heading">ОТЗЫВЫ КЛИЕНТОВ</h2></Reveal>
          <div className="reviews-grid">{reviews.map((review, index) => <Reveal key={review.name} delay={index * 0.08}><article className="review-card"><div className="stars" aria-label="5 из 5 звёзд">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={22} fill="currentColor" strokeWidth={0} />)}</div><h3>{review.name}</h3><time>{review.date}</time><p>{review.text}</p></article></Reveal>)}</div>
          <Reveal delay={0.2}><button className="review-button" onClick={() => contact.openFor("отзыв о работе студии")}>Оставить отзыв</button></Reveal>
        </div>
      </section>
    </main>
    <footer className="site-footer"><a className="brand" href="#home"><span>NAKA</span><span>STUDIO</span></a><p>© {new Date().getFullYear()} NAKA Studio</p><a href="tel:+375295225835">+375 29 522 5835</a></footer>
    <ContactDialog open={contact.open} service={contact.service} onClose={contact.close} />
  </>;
}
