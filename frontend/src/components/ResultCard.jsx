export default function ResultCard({ title, children, className = '' }) {
  return (
    <div className={`result-card ${className}`}>
      {title && <div className="result-card-title">{title}</div>}
      {children}
    </div>
  );
}
