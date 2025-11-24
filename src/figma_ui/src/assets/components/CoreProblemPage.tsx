import { Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

export function CoreProblemPage() {
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
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16 pb-32">
          <div className="max-w-7xl w-full relative z-10">
            {/* Page Title */}
            <motion.h2 
              className="text-[#FFFFFF] text-center mb-12" 
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              We Understand Your Challenges
            </motion.h2>

            {/* Value Box */}
            <motion.div 
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/50 rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.25)',
              }}
            >
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
              <div className="relative z-10 text-center">
                <h3 className="text-emerald-400 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                  We See You, We Understand
                </h3>
                <p className="text-emerald-100/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                  You're working too hard on tasks that don't grow your business. Kasibot is here to give you back your time so you can focus on what truly matters—building your company.
                </p>
              </div>
            </motion.div>

            {/* Three Column Layout */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Column 1 - The Visibility Gap */}
              <motion.div 
                className="bg-[#222222] rounded-xl p-6 border border-[#5233FF]/50 shadow-[0_0_30px_rgba(82,51,255,0.2)] relative overflow-hidden group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  boxShadow: [
                    '0 0 30px rgba(82, 51, 255, 0.2)',
                    '0 0 40px rgba(82, 51, 255, 0.3)',
                    '0 0 30px rgba(82, 51, 255, 0.2)',
                  ],
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.8 },
                  x: { delay: 0.4, duration: 0.8 },
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 50px rgba(82, 51, 255, 0.4)',
                }}
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5233FF]/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-2 rounded-lg bg-[#5233FF]/20 border border-[#5233FF]/50"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg className="w-6 h-6 text-[#5233FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                    <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      The Visibility Gap
                    </h3>
                  </div>
                  <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    Just as your customers trust Matrix to make every vehicle visible, they expect the same from their communication systems. When calls go unanswered, opportunities disappear—and unlike a tracked vehicle, there's no recovery mode for a lost customer.
                  </p>
                </div>
              </motion.div>

              {/* Column 2 - The Time Sink */}
              <motion.div 
                className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/50 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(82, 51, 255, 0.2)',
                }}
              >
                {/* Hover gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#5233FF]/0 to-[#5233FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-2 rounded-lg bg-[#5233FF]/10 border border-[#5233FF]/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Clock className="w-6 h-6 text-[#5233FF]" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      The Time Sink
                    </h3>
                  </div>
                  <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    South African businesses are drowning in manual tasks—managing calls, updating websites, handling social media and wrestling with outdated systems.
                  </p>
                </div>
              </motion.div>

              {/* Column 3 - The Hidden Cost */}
              <motion.div 
                className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/50 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(82, 51, 255, 0.2)',
                }}
              >
                {/* Hover gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#5233FF]/0 to-[#5233FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-2 rounded-lg bg-[#5233FF]/10 border border-[#5233FF]/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg className="w-6 h-6 text-[#5233FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                    <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                      The Hidden Cost
                    </h3>
                  </div>
                  <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    Every missed call is lost revenue. Every manual process is wasted money. Every hour spent on repetitive tasks is time you can't spend growing your business.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
