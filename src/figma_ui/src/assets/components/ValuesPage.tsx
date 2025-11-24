import { Clock, Heart, Handshake } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

export function ValuesPage() {
  const values = [
    {
      icon: Clock,
      title: 'Your Time, Your Legacy',
      description: 'Every hour we automate is an hour you can spend building your dream, growing your business or being with loved ones.',
    },
    {
      icon: Heart,
      title: 'Purpose Beyond Profit',
      description: 'We proudly run and support Non-Profit organizations across South Africa. When you work with us, you partner with a company that gives back and makes a real difference in our communities.',
    },
    {
      icon: Handshake,
      title: 'Local Partnership, Global Standards',
      description: 'We\'re a South African company serving South African businesses with world-class technology. Your success is our mission and your growth fuels our purpose.',
    },
  ];

  return (
    <div className="h-screen w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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
          className="text-[#FFFFFF] text-center mb-4" 
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          More Than Technology—We're Building a Better SA
        </motion.h2>
        <motion.p 
          className="text-[#5233FF] text-center mb-16" 
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Values Drive Everything We Do
        </motion.p>

        {/* Value Box */}
        <motion.div 
          className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/50 rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
              Built on Purpose, Driven by Values
            </h3>
            <p className="text-emerald-100/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
              When you partner with Kasibot, you're not just getting technology—you're joining a company that believes in giving back and building a better South Africa.
            </p>
          </div>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-[#222222] rounded-xl p-8 border border-[#333333] hover:border-[#5233FF]/50 transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(82, 51, 255, 0.3)',
              }}
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#5233FF]/0 to-[#5233FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5233FF]/20 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <motion.div 
                  className="p-4 rounded-xl bg-[#5233FF]/10 border border-[#5233FF]/30 group-hover:bg-[#5233FF]/20 group-hover:shadow-[0_0_20px_rgba(82,51,255,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <value.icon className="w-12 h-12 text-[#5233FF]" />
                  </motion.div>
                </motion.div>
                <h3 className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>
                  {value.title}
                </h3>
                <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
