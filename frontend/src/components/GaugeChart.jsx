import { useEffect, useRef } from 'react';

export default function GaugeChart({ value, max = 100, label, color = '#8B5CF6' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 200;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 + 10;
    const radius = 75;
    const lineWidth = 14;
    const startAngle = Math.PI * 0.8;
    const endAngle = Math.PI * 2.2;
    const totalAngle = endAngle - startAngle;

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Animate value arc
    const ratio = Math.min(value / max, 1);
    let currentRatio = 0;
    const animate = () => {
      currentRatio += (ratio - currentRatio) * 0.08;
      if (Math.abs(currentRatio - ratio) < 0.001) currentRatio = ratio;

      ctx.clearRect(0, 0, size, size);

      // Bg arc
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Value arc with gradient
      const grad = ctx.createLinearGradient(0, 0, size, 0);
      grad.addColorStop(0, '#8B5CF6');
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, '#A78BFA');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, startAngle + totalAngle * currentRatio);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Center value
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 32px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value), cx, cy - 8);

      // Label
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px Inter';
      ctx.fillText(label || '', cx, cy + 18);

      if (currentRatio < ratio) requestAnimationFrame(animate);
    };
    animate();
  }, [value, max, label, color]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}
