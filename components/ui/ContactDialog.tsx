"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const phone = "+375295225835";

export function useContactDialog() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const openFor = (selected = "") => { setService(selected); setOpen(true); };
  return { open, service, openFor, close: () => setOpen(false) };
}

export function ContactDialog({ open, service, onClose }: { open: boolean; service: string; onClose: () => void }) {
  const reduced = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);
  const isReview = service === "отзыв о работе студии";
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[data-contact-dialog]");
        const focusable = dialog?.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); previous?.focus(); };
  }, [open, onClose]);

  const message = encodeURIComponent(isReview
    ? "Здравствуйте! Хочу оставить отзыв о работе NAKA Studio."
    : `Здравствуйте! Хочу записаться${service ? ` на ${service.toLowerCase()}` : " в NAKA Studio"}. Подскажите, пожалуйста, свободное время.`);
  return (
    <AnimatePresence>
      {open && <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
        <motion.div data-contact-dialog role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="contact-dialog" onMouseDown={(e) => e.stopPropagation()}
          initial={reduced ? false : { opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? {} : { opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.25 }}>
          <button ref={closeButton} className="dialog-close" aria-label="Закрыть окно" onClick={onClose}><X size={24} /></button>
          <span className="section-kicker">{isReview ? "ВАШЕ МНЕНИЕ ВАЖНО" : "СВЯЖИТЕСЬ С НАМИ"}</span>
          <h2 id="dialog-title">{isReview ? <>ОСТАВИТЬ<br /><em>ОТЗЫВ</em></> : <>ЗАПИСАТЬСЯ<br /><em>В NAKA</em></>}</h2>
          <p>{isReview ? "Напишите нам в WhatsApp, что понравилось и что можно улучшить. Команда прочитает ваше сообщение." : service ? `Уточним детали услуги «${service}» и подберём удобное время.` : "Расскажите, что нужно вашему автомобилю. Подберём услугу и удобное время."}</p>
          <div className="dialog-actions">
            {isReview ? <>
              <a className="button button-primary" href={`https://wa.me/${phone.slice(1)}?text=${message}`} target="_blank" rel="noopener noreferrer"><Send size={18} /> НАПИСАТЬ ОТЗЫВ</a>
              <a className="button button-outline" href={`tel:${phone}`}><Phone size={18} /> ПОЗВОНИТЬ</a>
            </> : <>
              <a className="button button-primary" href={`tel:${phone}`}><Phone size={18} /> ПОЗВОНИТЬ</a>
              <a className="button button-outline" href={`https://wa.me/${phone.slice(1)}?text=${message}`} target="_blank" rel="noopener noreferrer"><Send size={18} /> НАПИСАТЬ В WHATSAPP</a>
            </>}
          </div>
          <a className="dialog-phone" href={`tel:${phone}`}>+375 29 522 5835</a>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
