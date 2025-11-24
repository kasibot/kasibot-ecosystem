import kasibotLogo from '@/assets/10a89b621102c57443f2cbd7ddb846724e05e232.png';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ClientEcosystemEntryProps {
  onEnterEcosystem: () => void;
}

export function ClientEcosystemEntry({ onEnterEcosystem }: ClientEcosystemEntryProps) {
  const [isEntering, setIsEntering] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  const handleEnterClick = () => {
    setIsEntering(true);
    
    // Show black screen after button animation
    setTimeout(() => {
      setShowBlackScreen(true);
    }, 800);

    // Transition to ecosystem
    setTimeout(() => {
      onEnterEcosystem();
    }, 2000);
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

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ opacity: 1 }} // Ensure visible even if motion fails
      >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img 
              src={kasibotLogo} 
              alt="Kasibot.io" 
              className="h-20 w-auto"
              style={{ filter: 'drop-shadow(0 0 30px rgba(82, 51, 255, 0.5))' }}
            />
          </motion.div>

        {/* Slogan */}
        <motion.h3
          className="text-[#5233FF] mb-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We Buy Time
        </motion.h3>

        {/* Main Title */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Building2 className="w-10 h-10 text-[#5233FF]" />
          <h1 
            className="text-[#FFFFFF]" 
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3.5rem' }}
          >
            Client Ecosystem
          </h1>
        </motion.div>

        {/* Services Line */}
        <motion.p
          className="text-[#B0B0B0] mb-3"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          AI Automation • Web Development • Digital Marketing • Everything Online
        </motion.p>

        {/* Values Line */}
        <motion.p
          className="text-[#5233FF] mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Proudly South African • Building Better Businesses • Supporting Our Communities
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnterClick}
          disabled={isEntering}
          className="px-12 py-4 bg-[#5233FF] text-[#FFFFFF] rounded-xl relative overflow-hidden group disabled:opacity-50"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.25rem',
            boxShadow: '0 0 40px rgba(82, 51, 255, 0.5)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ 
            scale: isEntering ? 1 : 1.05,
            boxShadow: isEntering ? '0 0 40px rgba(82, 51, 255, 0.5)' : '0 0 60px rgba(82, 51, 255, 0.8)'
          }}
          whileTap={{ scale: isEntering ? 1 : 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#5233FF] opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <span className="relative z-10">Enter Ecosystem</span>
        </motion.button>

        {/* Loading indicator when entering */}
        <AnimatePresence>
          {isEntering && (
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-[#5233FF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-2 h-2 bg-[#5233FF] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-[#5233FF] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-[#5233FF] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
