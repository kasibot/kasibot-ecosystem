import { Button } from './ui/button';
import { Calendar, Send } from 'lucide-react';
import logo from 'figma:asset/10a89b621102c57443f2cbd7ddb846724e05e232.png';
import { motion } from 'motion/react';

export function CTAPage() {
  return (
    <div className="h-screen w-full bg-[#1A1A1A] flex items-center justify-center px-8 py-16 pb-32 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src={logo} 
            alt="Kasibot.io" 
            className="h-16 object-contain"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(82, 51, 255, 0.4))',
                'drop-shadow(0 0 30px rgba(82, 51, 255, 0.6))',
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

        {/* Large Heading */}
        <motion.h2 
          className="text-[#FFFFFF] mb-6" 
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '4rem' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Ready to Take Control of Every Call, Just Like Every Fleet?
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          className="text-[#B0B0B0] mb-4 max-w-2xl mx-auto" 
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Let's build Matrix's digital communication future together.
        </motion.p>
        <motion.p 
          className="text-[#B0B0B0] mb-12 max-w-3xl mx-auto" 
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Matrix gives businesses visibility, intelligence and control over their vehicle fleets.
          Kasibot brings the same precision and automation to your customer communication fleet — ensuring no call goes unanswered, no lead goes untracked and every interaction drives measurable growth.
          <br /><br />
          Schedule a free 30-minute strategy session and discover how Matrix x Kasibot can redefine operational efficiency, from the road to the phone.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a href="https://calendar.app.google/onYjh8yYqonepo3AA" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-[#5233FF] text-[#FFFFFF] hover:bg-[#4229dd] rounded-xl px-10 py-7 shadow-[0_0_40px_rgba(82,51,255,0.4)] hover:shadow-[0_0_60px_rgba(82,51,255,0.6)] transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Calendar className="mr-2 w-6 h-6" />
                </motion.div>
                Let's Map Your Communication Fleet Together
              </Button>
            </motion.div>
          </a>
          <a href="https://www.kasibot.io/book-demo-1" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-transparent border-2 border-[#5233FF] text-[#5233FF] hover:bg-[#5233FF] hover:text-[#FFFFFF] rounded-xl px-10 py-7 transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
              >
                <motion.div
                  animate={{
                    x: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Send className="mr-2 w-6 h-6" />
                </motion.div>
                Send Me More Info
              </Button>
            </motion.div>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="pt-8 border-t border-[#333333]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <p className="text-[#B0B0B0] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
            Join South African leaders like SkillLink, Goldwagen and Golf4BreastCancer who trust Kasibot's AI-powered communication systems to streamline operations and recover lost opportunities.
          </p>
          <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
            Proudly South African • Powering Local Innovation • Supporting National Growth
          </p>
          <p className="text-[#5233FF] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
            We're excited to partner with{' '}
            <motion.span 
              className="text-[#FFFFFF]"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255, 255, 255, 0.5)',
                  '0 0 20px rgba(255, 255, 255, 0.8)',
                  '0 0 10px rgba(255, 255, 255, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Matrix
            </motion.span>{' '}
            to drive the next wave of smart business automation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
