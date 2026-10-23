"use client";

import { useEffect } from "react";

export function ScrollAtmosphere() {
  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mounted = true;
    const setup = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 900) return;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          gsap.fromTo(element, { yPercent: -5 }, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: element.closest("section") ?? element, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });
      });
    };
    setup();
    return () => { mounted = false; context?.revert(); };
  }, []);
  return null;
}
