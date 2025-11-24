import kasibotLogo from 'figma:asset/10a89b621102c57443f2cbd7ddb846724e05e232.png';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CoverPageProps {
  onBeginComplete: () => void;
}

export function CoverPage({ onBeginComplete }: CoverPageProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  const handleBeginClick = () => {
    setIsZooming(true);
    
    // After zoom completes, show black screen
    setTimeout(() => {
      setShowBlackScreen(true);
    }, 2000);

    // After black screen, trigger callback to show document
    setTimeout(() => {
      onBeginComplete();
    }, 3000);
  };

  return (
    <div className="h-screen w-full bg-[#1A1A1A] flex flex-col items-center justify-center relative overflow-hidden px-8">
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
      
      {/* Black Screen Overlay */}
      <AnimatePresence>
        {showBlackScreen && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Zoom Overlay */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: 100 }}
            transition={{ 
              duration: 2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div className="w-32 h-16 bg-black rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
        animate={isZooming ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.div 
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img 
            src={kasibotLogo} 
            alt="Kasibot.io" 
            className="h-24 object-contain"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(82, 51, 255, 0.4))',
                'drop-shadow(0 0 40px rgba(82, 51, 255, 0.6))',
                'drop-shadow(0 0 20px rgba(82, 51, 255, 0.4))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h2 
          className="text-[#FFFFFF] max-w-4xl mx-auto" 
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3.5rem', lineHeight: '1.2' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          We understand what{' '}
          <motion.span 
            className="text-[#5233FF]"
            animate={{
              textShadow: [
                '0 0 20px rgba(82, 51, 255, 0.5)',
                '0 0 30px rgba(82, 51, 255, 0.8)',
                '0 0 20px rgba(82, 51, 255, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            'Always Right By Your Side'
          </motion.span>{' '}
          really means
        </motion.h2>

        {/* Subheading */}
        <motion.p 
          className="text-[#B0B0B0] max-w-2xl mx-auto" 
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          AI Automation • Web Development • Digital Marketing • Everything Online
        </motion.p>
        <motion.p 
          className="text-[#5233FF] max-w-2xl mx-auto mt-4" 
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Proudly South African • Building Better Businesses • Supporting Our Communities
        </motion.p>

        {/* Begin Button */}
        <motion.div 
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            onClick={handleBeginClick}
            className="relative group px-12 py-4 bg-gradient-to-r from-[#5233FF] to-[#6B46FF] rounded-xl border-2 border-[#5233FF] overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isZooming}
            style={{
              boxShadow: '0 0 40px rgba(82, 51, 255, 0.4)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Button glow */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(82, 51, 255, 0.4)',
                  '0 0 40px rgba(82, 51, 255, 0.6)',
                  '0 0 20px rgba(82, 51, 255, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span 
              className="relative z-10 text-[#FFFFFF]" 
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
            >
              Begin
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}