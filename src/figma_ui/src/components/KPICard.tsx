import { ReactNode } from "react";

interface KPICardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  suffix?: string;
  locked?: boolean;
}

export function KPICard({ icon, label, value, trend, trendUp, suffix = "", locked = false }: KPICardProps) {
  return (
    <div 
      className="bg-[#222222] border border-[#333333] rounded-xl p-6 hover:border-[#5233FF]/50 transition-all duration-300 relative"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
    >
      {locked && (
        <div className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-[#B0B0B0] text-sm">Unlock CRM Insights →</p>
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="text-[#5233FF]">
          {icon}
        </div>
        {trend && !locked && (
          <span className={`text-xs px-2 py-1 rounded ${trendUp ? 'bg-[#00C853]/10 text-[#00C853]' : 'bg-[#FF5252]/10 text-[#FF5252]'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      
      <p className="text-[#B0B0B0] text-sm mb-2">{label}</p>
      <p className="text-[#FFFFFF] text-3xl">
        {value}{suffix}
      </p>
    </div>
  );
}
