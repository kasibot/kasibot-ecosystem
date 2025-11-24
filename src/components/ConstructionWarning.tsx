import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export function ConstructionWarning() {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#222222] border border-[#5233FF] rounded-xl p-6 shadow-lg"
           style={{ boxShadow: '0 0 20px rgba(82, 51, 255, 0.3)' }}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="bg-[#5233FF] rounded-lg p-3 flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-[#FFFFFF] text-lg font-bold mb-2">
              ECOSYSTEM UNDER CONSTRUCTION
            </h3>
            <p className="text-[#B0B0B0] text-sm mb-4">
              ALL DATA IS FAKE
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

