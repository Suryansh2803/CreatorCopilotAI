export default function ResultCard({ title, children, className = '' }) {
  return (
    <div className={`glass-strong gradient-border p-6 rounded-2xl ${className}`}>
      {title && (
        <h3 className="text-base font-bold gradient-text-2 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
