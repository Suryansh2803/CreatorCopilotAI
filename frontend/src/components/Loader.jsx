export default function Loader({ text = 'Generating with Gemini...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <div className="spinner" />
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
      </div>
      <p className="text-gray-400 text-sm">{text}</p>
      <p className="text-gray-600 text-xs mt-1">This may take a few seconds…</p>
    </div>
  );
}
