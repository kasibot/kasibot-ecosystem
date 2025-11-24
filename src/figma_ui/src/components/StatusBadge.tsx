interface StatusBadgeProps {
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Complete' | 'Live' | 'On Hold';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    'Not Started': 'bg-[#2A2A2A] text-[#666666] border-[#3A3A3A]',
    'In Progress': 'bg-[#5233FF]/10 text-[#5233FF] border-[#5233FF]/30',
    'In Review': 'bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]/30',
    'Complete': 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/30',
    'Live': 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/30',
    'On Hold': 'bg-[#FF5252]/10 text-[#FF5252] border-[#FF5252]/30'
  };

  return (
    <span className={`px-3 py-1 rounded-lg border text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}
