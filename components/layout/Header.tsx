"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Instagram, Menu, Phone, Send, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

const links = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#wrap" },
  { label: "О студии", href: "#about" },
  { label: "Локации", href: "#locations" },
  { label: "Отзывы", href: "#reviews" },
];

export function Header({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.classList.contains("service-stage") ? "wrap" : visible[0].target.id);
    }, { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.2, 0.5] });
    document.querySelectorAll("main > section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); return () => document.body.classList.remove("menu-open"); }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  const close = () => {
    document.body.classList.remove("menu-open");
    setMenuOpen(false);
  };
  const followMobileLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    close();
    window.history.pushState(null, "", href);
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="NAKA Studio — главная" onClick={close}><span>NAKA</span><span>STUDIO</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">{links.map((link) => <a key={link.href} className={active === link.href.slice(1) ? "active" : ""} href={link.href}>{link.label}</a>)}</nav>
        <div className="header-right">
          <a className="header-phone" href="tel:+375295225835">+375 29 522 5835</a>
          <button className="social-button instagram-button" aria-label="Контакты в социальных сетях" onClick={onContact}><Instagram size={22} /></button>
          <button className="social-button" aria-label="Связаться с нами" onClick={onContact}><Send size={21} /></button>
          <a className="social-button" aria-label="Написать в WhatsApp" href="https://wa.me/375295225835" target="_blank" rel="noopener noreferrer"><Phone size={21} /></a>
        </div>
        <button className="menu-toggle" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{menuOpen && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Мобильная навигация" initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduced ? {} : { opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
        {links.map((link) => <a key={link.href} href={link.href} onClick={(event) => followMobileLink(event, link.href)}>{link.label}</a>)}
        <a className="mobile-phone" href="tel:+375295225835" onClick={close}>+375 29 522 5835</a>
      </motion.nav>}</AnimatePresence>
    </header>
  );
}
