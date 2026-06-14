import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Card({ title, desc, icon: Icon, color, path }) {
  return (
    <Link
      to={path}
      id={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="glass group p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 block"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}20` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Open Tool <HiOutlineArrowRight />
      </div>
    </Link>
  );
}
