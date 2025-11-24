import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

interface Deliverable {
  title: string;
  completed: boolean;
}

interface ServiceTrackProps {
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Complete' | 'Live' | 'On Hold';
  progress: number;
  deliverables: Deliverable[];
}

export function ServiceTrack({
  title,
  description,
  status,
  progress,
  deliverables
}: ServiceTrackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-[#222222] border border-[#333333] rounded-xl overflow-hidden hover:border-[#5233FF]/50 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-[#FFFFFF] mb-2">{title}</h3>
            <p className="text-[#B0B0B0] text-sm">{description}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#B0B0B0]">Overall Progress</span>
            <span className="text-xs text-[#5233FF]">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-[#5233FF] hover:text-[#7B61FF] transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Deliverables
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              View Deliverables ({deliverables.length})
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-[#1A1A1A] border-t border-[#333333] p-6">
          <h4 className="text-sm text-[#FFFFFF] mb-4">Deliverables</h4>
          <div className="space-y-3">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start gap-3">
                {deliverable.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-[#666666] flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${deliverable.completed ? 'text-[#B0B0B0] line-through' : 'text-[#B0B0B0]'}`}>
                  {deliverable.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
