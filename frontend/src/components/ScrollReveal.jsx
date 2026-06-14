import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wraps children and animates .reveal, .reveal-left, .reveal-right, .reveal-scale inside on scroll
export default function ScrollReveal({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up
      gsap.utils.toArray('.reveal', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });
      // Fade left
      gsap.utils.toArray('.reveal-left', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });
      // Fade right
      gsap.utils.toArray('.reveal-right', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });
      // Scale
      gsap.utils.toArray('.reveal-scale', containerRef.current).forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef} className={className}>{children}</div>;
}
