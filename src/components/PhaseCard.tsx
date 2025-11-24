import { ProgressBar } from "@/components/ProgressBar";
import { StatusBadge } from "@/components/StatusBadge";

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  owner: string;
  duration: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Complete' | 'Live' | 'On Hold';
  progress: number;
}

export function PhaseCard({
  phaseNumber,
  title,
  owner,
  duration,
  description,
  status,
  progress
}: PhaseCardProps) {
  return (
    <div 
      className="bg-[#222222] border border-[#333333] rounded-xl p-6 hover:border-[#5233FF]/50 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-lg bg-[#5233FF]/10 border border-[#5233FF]/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(82, 51, 255, 0.2)' }}
            >
              <span className="text-[#5233FF]">{phaseNumber}</span>
            </div>
            <h3 className="text-[#FFFFFF] flex-1">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#B0B0B0] ml-[52px]">
            <span>👤 {owner}</span>
            <span>⏱️ {duration}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <p className="text-[#B0B0B0] text-sm mb-4 ml-[52px]">
        {description}
      </p>
      
      <div className="ml-[52px]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#B0B0B0]">Progress</span>
          <span className="text-xs text-[#5233FF]">{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
}
