import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/* ─── Three.js particle canvas ─── */
function ParticleCanvas({ color = '#38bdf8' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth || 400;
    const H = el.clientHeight || 200;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Particles
    const COUNT = 120;
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.002 + Math.random() * 0.004;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const hex = parseInt(color.replace('#', ''), 16);
    const mat = new THREE.PointsMaterial({
      color: hex,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Animate
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const pos = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i];
        if (pos[i * 3 + 1] > 2.5) pos[i * 3 + 1] = -2.5;
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    tick();

    // Resize
    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
}

/* ─── Main AnimatedResultCard ─── */
export default function AnimatedResultCard({
  title,
  children,
  accentColor = '#38bdf8',
  delay = 0,
  showParticles = true,
  className = '',
}) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const line = lineRef.current;
    if (!card) return;

    // Set initial state
    gsap.set(card, { opacity: 0, y: 40, scale: 0.96 });
    gsap.set(content, { opacity: 0, y: 16 });
    if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

    // Animate in
    const tl = gsap.timeline({ delay });
    tl.to(card, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to(line, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3')
    .to(content, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3');

    return () => tl.kill();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`arc ${className}`}
      style={{
        position: 'relative',
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid rgba(255,255,255,0.1)`,
        borderTop: `1px solid rgba(255,255,255,0.18)`,
        borderLeft: `1px solid rgba(255,255,255,0.14)`,
        borderRadius: 18,
        padding: '24px 24px 22px',
        overflow: 'hidden',
        boxShadow: `0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.12) inset`,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        gsap.to(e.currentTarget, {
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${accentColor}18, 0 0 0 1px ${accentColor}22`,
          duration: 0.3, ease: 'power2.out',
        });
      }}
      onMouseLeave={e => {
        gsap.to(e.currentTarget, {
          boxShadow: `0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.12) inset`,
          duration: 0.3, ease: 'power2.out',
        });
      }}
    >
      {/* Three.js particle bg */}
      {showParticles && <ParticleCanvas color={accentColor} />}

      {/* Gradient top glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
        borderRadius: '18px 18px 0 0',
        zIndex: 1,
      }} />

      {/* Corner accent dot */}
      <div style={{
        position: 'absolute',
        top: 16, right: 16,
        width: 6, height: 6,
        borderRadius: '50%',
        background: accentColor,
        boxShadow: `0 0 10px ${accentColor}`,
        opacity: 0.7,
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {title && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: accentColor,
                fontFamily: 'Inter, sans-serif',
              }}>{title}</span>
            </div>
            {/* animated underline */}
            <div ref={lineRef} style={{
              height: 1,
              background: `linear-gradient(90deg, ${accentColor}60, transparent)`,
              borderRadius: 1,
              marginLeft: 18,
            }} />
          </div>
        )}
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
