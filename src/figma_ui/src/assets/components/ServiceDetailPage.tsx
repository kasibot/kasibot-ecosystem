import { Check, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

interface ServiceDetail {
  title: string;
  features: string[];
  value: string;
}

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBack: () => void;
}

export function ServiceDetailPage({ service, onBack }: ServiceDetailPageProps) {
  return (
    <div className="h-screen w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#5233FF] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <ScrollArea className="h-full w-full">
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
          <div className="max-w-4xl w-full relative z-10">
            {/* Title */}
            <motion.h2 
              className="text-[#FFFFFF] mb-12" 
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {service.title}
            </motion.h2>

            {/* Features Checklist */}
            <motion.div 
              className="bg-[#222222] rounded-xl p-8 border border-[#333333] mb-8 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ 
                borderColor: 'rgba(82, 51, 255, 0.5)',
                boxShadow: '0 0 30px rgba(82, 51, 255, 0.2)',
              }}
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#5233FF]/0 to-[#5233FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <h3 className="text-[#FFFFFF] mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>
                  Key Features
                </h3>
                <div className="space-y-4">
                  {service.features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5233FF] flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="w-4 h-4 text-[#1A1A1A]" strokeWidth={3} />
                      </motion.div>
                      <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Value Box */}
            <motion.div 
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/50 rounded-xl p-8 mb-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(16, 185, 129, 0.15)',
                  '0 0 45px rgba(16, 185, 129, 0.25)',
                  '0 0 30px rgba(16, 185, 129, 0.15)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <p className="text-emerald-100 leading-relaxed relative z-10" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 600 }}>
                {service.value}
              </p>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                onClick={onBack}
                className="bg-transparent border-2 border-[#5233FF] text-[#5233FF] hover:bg-[#5233FF] hover:text-[#1A1A1A] transition-all duration-300 rounded-xl px-8 py-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Services
              </Button>
            </motion.div>

            {/* Bottom spacing */}
            <div className="h-8"></div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
