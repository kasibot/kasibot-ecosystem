import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Navigation({ currentPage, totalPages, onPageChange }: NavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#222222] border border-[#5233FF]/50 rounded-full px-6 py-3 shadow-[0_0_30px_rgba(82,51,255,0.3)]">
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-[#5233FF]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-[#5233FF]" />
        </button>

        {/* Home Button */}
        <button
          onClick={() => onPageChange(1)}
          className="p-2 rounded-full hover:bg-[#5233FF]/20 transition-all"
        >
          <Home className="w-5 h-5 text-[#5233FF]" />
        </button>

        {/* Page Indicator */}
        <div className="flex items-center gap-2 px-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === i + 1
                  ? 'bg-[#5233FF] w-8'
                  : 'bg-[#5233FF]/30 hover:bg-[#5233FF]/60'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-[#5233FF]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-[#5233FF]" />
        </button>
      </div>
    </div>
  );
}
