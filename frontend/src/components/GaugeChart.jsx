import { useEffect, useRef } from 'react';

export default function GaugeChart({ value, max = 100, label, color = '#38bdf8' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 180;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 + 12;
    const radius    = 68;
    const lineWidth = 10;
    const startAngle = Math.PI * 0.78;
    const endAngle   = Math.PI * 2.22;
    const totalAngle = endAngle - startAngle;

    const ratio = Math.min(value / max, 1);
    let currentRatio = 0;

    const animate = () => {
      currentRatio += (ratio - currentRatio) * 0.09;
      if (Math.abs(currentRatio - ratio) < 0.001) currentRatio = ratio;

      ctx.clearRect(0, 0, size, size);

      // Track arc
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Value arc
      if (currentRatio > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, startAngle + totalAngle * currentRatio);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Center value
      ctx.fillStyle = '#f0ede8';
      ctx.font = `700 28px Syne, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value), cx, cy - 8);

      // Label
      ctx.fillStyle = '#57534e';
      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillText(label || '', cx, cy + 16);

      if (currentRatio < ratio) requestAnimationFrame(animate);
    };
    animate();
  }, [value, max, label, color]);

  return (
    <div className="gauge-wrap">
      <canvas ref={canvasRef} />
    </div>
  );
}
