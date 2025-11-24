interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-[#2A2A2A] rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-[#5233FF] to-[#7B61FF] transition-all duration-500 ease-out"
        style={{ 
          width: `${Math.min(100, Math.max(0, progress))}%`,
          boxShadow: '0 0 10px rgba(82, 51, 255, 0.5)'
        }}
      />
    </div>
  );
}
