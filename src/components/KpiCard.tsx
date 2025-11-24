import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  // Figma UI props (optional, for compatibility)
  label?: string; // alias for title
  suffix?: string;
  locked?: boolean;
}

export default function KpiCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  subtitle,
  label, // Figma UI compatibility
  suffix = "",
  locked = false
}: KpiCardProps) {
  // Use label if provided (Figma UI), otherwise use title
  const displayLabel = label || title;
  
  // Format trend for display
  const trendDisplay = trend
    ? `${trend.isPositive ? '+' : '-'}${Math.abs(trend.value)}%`
    : undefined;
  
  // Type guard to ensure trend exists when used
  const hasTrend = trend !== undefined;

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
          <Icon className="w-6 h-6" />
        </div>
        {trendDisplay && !locked && hasTrend && trend && (
          <span className={`text-xs px-2 py-1 rounded ${
            trend.isPositive 
              ? 'bg-[#00C853]/10 text-[#00C853]' 
              : 'bg-[#FF5252]/10 text-[#FF5252]'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trendDisplay}
          </span>
        )}
      </div>
      
      <p className="text-[#B0B0B0] text-sm mb-2">{displayLabel}</p>
      <p className="text-[#FFFFFF] text-3xl">
        {value}{suffix}
      </p>
      {subtitle && (
        <p className="text-[#666666] text-xs mt-1">{subtitle}</p>
      )}
    </div>
  );
}
