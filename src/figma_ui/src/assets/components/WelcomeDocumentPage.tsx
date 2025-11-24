import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

interface WelcomeDocumentPageProps {
  onNext?: () => void;
}

export function WelcomeDocumentPage({ onNext }: WelcomeDocumentPageProps) {
  return (
    <div className="h-screen w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Subtle background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#5233FF] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <ScrollArea className="h-full w-full">
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
          <motion.div 
            className="max-w-5xl w-full relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Document Container */}
            <div className="bg-[#222222] rounded-xl border-2 border-[#5233FF]/30 shadow-[0_0_60px_rgba(82,51,255,0.2)] overflow-hidden">
              {/* Document Header */}
              <motion.div 
                className="bg-gradient-to-r from-[#5233FF]/20 to-[#5233FF]/10 border-b border-[#5233FF]/30 px-8 py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 
                  className="text-[#FFFFFF] text-center mb-2" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
                >
                  📄 WELCOME DOCUMENT
                </h1>
                <p 
                  className="text-[#5233FF] text-center mb-1" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}
                >
                  Company Name
                </p>
                <p 
                  className="text-[#B0B0B0] text-center" 
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                >
                  Powered by KASIBOT.IO (PTY) LTD
                </p>
              </motion.div>

              {/* Document Body */}
              <motion.div 
                className="px-8 py-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {/* Welcome Section */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                  >
                    👋 Welcome
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333] space-y-4">
                    <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      Thank you for choosing Kasibot.io as your automation and AI solutions partner.
                      We are excited to begin this journey with you and help transform how your business communicates, operates and scales.
                    </p>
                    
                    <p className="text-[#B0B0B0] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                      This welcome document gives you a high-level overview of:
                    </p>
                    
                    <ul className="space-y-2 ml-6">
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • What you can expect next
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • How the onboarding and delivery process works
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • Who your points of contact are
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • Where resources and support will be accessible
                      </li>
                    </ul>
                    
                    <p className="text-[#5233FF] italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Our goal is to ensure the experience feels clear, structured and effortless from start to finish.
                    </p>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    📦 What's Included in Your Package
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Your selected solution includes:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          AI automation services tailored to your business needs
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Setup, configuration and training of your assistant(s)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Integration support with required platforms and systems
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Ongoing optimisation and improvements throughout your subscription
                        </span>
                      </div>
                    </div>
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      Additional features, add-ons or future upgrades can be discussed at any time.
                    </p>
                  </div>
                </div>

                {/* Project Journey */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    🛠️ Project Journey at a Glance
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Your onboarding and deployment follow a structured, guided process.
                      This ensures quality, accuracy and a seamless experience from first setup to final handover.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Stage</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Summary</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Kickoff & Access Setup</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Required permissions, system access and alignment call.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Build & Configurations</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>AI agent setup, scripts, logic, integrations and knowledge base training.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Testing & Refinement</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Live testing, improvements and fine-tuning based on business needs.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Launch & Activation</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Go-live deployment with automation and call handling enabled.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Continuous Support</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Ongoing enhancements, monitoring and subscription support.</p>
                      </div>
                    </div>
                    
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      Full milestone details and deadlines are included in the Client Service Agreement.
                    </p>
                  </div>
                </div>

                {/* Communication & Support */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    👥 Communication & Support
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      To keep communication simple and aligned, you will have:
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Category</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Contact Method</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>General Support</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>support@kasibot.io</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Technical or Integration Queries</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Assigned onboarding specialist</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Account & Billing</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>accounts@kasibot.io</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Emergency Support</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Provided after activation</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#333333]">
                      <p className="text-[#B0B0B0] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        You will also access a client portal containing:
                      </p>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          • Progress tracking
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          • Files and documentation
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          • Service guides
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          • Request forms
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          • Configuration details
                        </li>
                      </ul>
                      <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                        Access instructions will be shared once onboarding begins.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resources & Documentation */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    📁 Resources & Documentation
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Throughout your onboarding you will receive:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]">📌</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Knowledge base materials
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]">📌</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Reporting or monitoring tools where applicable
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]">📌</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Training documents and user guides
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]">📌</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Optional addon documentation if selected
                        </span>
                      </div>
                    </div>
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      All documentation will remain accessible for the duration of your subscription.
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    🚀 Next Steps
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Your assigned onboarding coordinator will contact you shortly to begin the next phase.
                      To speed things up, please prepare any required business information, approvals or documentation noted in the agreement.
                    </p>
                  </div>
                </div>

                {/* Closing Message */}
                <div className="bg-gradient-to-r from-[#5233FF]/20 to-[#5233FF]/10 rounded-xl p-8 border border-[#5233FF]/30 text-center">
                  <h3 
                    className="text-[#FFFFFF] mb-4" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                  >
                    Welcome to the Future of Operations.
                  </h3>
                  <p className="text-[#B0B0B0] leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    We're looking forward to building an intelligent, automated experience that drives efficiency, 
                    improves customer communication and supports long-term growth for your business.
                  </p>
                </div>

                {/* Footer */}
                <motion.div 
                  className="pt-8 border-t border-[#333333] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <p className="text-[#5233FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                    Kasibot.io (PTY) LTD
                  </p>
                  <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                    Proudly South African • Built for Scale • Supporting National Growth
                  </p>
                </motion.div>

                {/* Next Button */}
                {onNext && (
                  <motion.div 
                    className="flex justify-center pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <motion.button
                      onClick={onNext}
                      className="relative group px-12 py-4 bg-gradient-to-r from-[#5233FF] to-[#6B46FF] rounded-xl border-2 border-[#5233FF] overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                      >
                        View Invoices
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
}