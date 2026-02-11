import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/10 flex items-center gap-4 hover:scale-[1.02] transition-transform">
    <div className="p-3 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full">
      <Icon className="text-indigo-300" size={28} />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white">{value}</h2>
      <p className="text-gray-300">{title}</p>
    </div>
  </div>
);


export default StatCard;
