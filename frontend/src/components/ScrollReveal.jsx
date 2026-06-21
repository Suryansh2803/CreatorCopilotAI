import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
      gsap.utils.toArray('.reveal-left', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
      gsap.utils.toArray('.reveal-right', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
      gsap.utils.toArray('.reveal-scale', containerRef.current).forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)', delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return <div ref={containerRef} className={className}>{children}</div>;
}
