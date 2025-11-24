import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Phone, MessageCircle, Mail, FileText, CheckCircle, Clock, User, LogOut, Rocket, ChevronDown, ChevronUp, Zap, Network } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useUserMetadata } from '@/lib/clerk';

interface ClientDashboardPageProps {
  onViewAgreement?: () => void;
  onViewWelcome?: () => void;
  onViewInvoices?: () => void;
  onViewFulfillment?: () => void;
  onViewDashboardEcosystem?: () => void;
}

export function ClientDashboardPage({ 
  onViewAgreement, 
  onViewWelcome, 
  onViewInvoices, 
  onViewFulfillment,
  onViewDashboardEcosystem 
}: ClientDashboardPageProps) {
  const { user } = useUser();
  const metadata = useUserMetadata();
  const [showCallbackInput, setShowCallbackInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSupportOptions, setShowSupportOptions] = useState(false);
  
  // Get account manager from user metadata or use default
  const accountManager = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : 'Sarah Johnson';

  const handleRequestCallback = () => {
    if (phoneNumber) {
      console.log('Requesting callback for:', phoneNumber);
      alert(`Callback requested for ${phoneNumber}. A support agent will contact you shortly!`);
      setPhoneNumber('');
      setShowCallbackInput(false);
    }
  };

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
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
          <motion.div 
            className="max-w-7xl w-full relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Network className="w-12 h-12 text-[#5233FF]" />
                <h1 
                  className="text-[#FFFFFF]" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '3rem' }}
                >
                  Client Ecosystem
                </h1>
              </div>
              <p 
                className="text-[#B0B0B0]" 
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem' }}
              >
                Your hub for support, meetings and account management
              </p>
            </motion.div>

            {/* Top Row: Account Info + Project Status */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Account Info - 2 columns */}
              <motion.div
                className="md:col-span-2 bg-gradient-to-br from-[#5233FF]/20 to-[#6B46FF]/10 rounded-xl p-6 border border-[#5233FF]/50"
                style={{ boxShadow: '0 0 40px rgba(82, 51, 255, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-[#5233FF]" />
                  <h3 className="text-[#FFFFFF] text-xl">Account Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-sm mb-1">Package</p>
                    <p className="text-[#5233FF] text-lg">Enterprise AI Suite</p>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-sm mb-1">Account Manager</p>
                    <p className="text-[#FFFFFF]">{accountManager}</p>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-sm mb-1">Start Date</p>
                    <p className="text-[#FFFFFF]">01 January 2025</p>
                  </div>
                  
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-sm mb-1">Renewal Date</p>
                    <p className="text-[#FFFFFF]">01 April 2025</p>
                  </div>
                </div>
              </motion.div>

              {/* Project Status - 1 column */}
              <motion.div
                className="bg-[#222222] rounded-xl p-6 border border-[#333333]"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#5233FF]" />
                  <h3 className="text-[#FFFFFF] text-lg">Project Status</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  {[
                    { label: 'Agreement Signed', completed: true },
                    { label: 'Onboarding Complete', completed: true },
                    { label: 'AI Build in Progress', completed: false, active: true },
                    { label: 'Testing Phase', completed: false, active: false },
                    { label: 'Live Deployment', completed: false, active: false },
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        milestone.completed 
                          ? 'bg-green-500/20 border-green-500' 
                          : milestone.active 
                          ? 'bg-[#5233FF]/20 border-[#5233FF]' 
                          : 'bg-[#333333]/20 border-[#333333]'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : milestone.active ? (
                          <Clock className="w-3 h-3 text-[#5233FF]" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#666666]" />
                        )}
                      </div>
                      <p className={`text-sm ${
                        milestone.completed 
                          ? 'text-green-500' 
                          : milestone.active 
                          ? 'text-[#5233FF]' 
                          : 'text-[#666666]'
                      }`}>
                        {milestone.label}
                      </p>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  onClick={onViewFulfillment}
                  className="w-full px-4 py-3 bg-[#5233FF]/20 text-[#5233FF] rounded-xl border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(82, 51, 255, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Rocket className="w-4 h-4" />
                  View Full Details
                </motion.button>
              </motion.div>
            </div>

            {/* Primary CTA: Schedule Meeting */}
            <motion.div
              className="bg-gradient-to-br from-[#5233FF]/20 to-[#6B46FF]/10 rounded-xl p-8 border-2 border-[#5233FF]/50 mb-6"
              style={{ boxShadow: '0 0 40px rgba(82, 51, 255, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-6">
                <div className="bg-[#5233FF] p-4 rounded-xl">
                  <Calendar className="w-8 h-8 text-[#FFFFFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#FFFFFF] text-2xl mb-2">Schedule a Meeting</h3>
                  <p className="text-[#B0B0B0] mb-4">
                    Book your next strategy, support or check-in call with your dedicated account manager.
                  </p>
                  <motion.a
                    href="https://calendar.app.google/nJjsBPNgNiFxghFT8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-[#5233FF] text-[#FFFFFF] rounded-xl border-2 border-[#5233FF]"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(82, 51, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    Book Now
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Ecosystem Access - PROMINENT */}
            <motion.div
              className="bg-gradient-to-br from-[#FFA500]/20 to-[#FF8C00]/10 rounded-xl p-6 border-2 border-[#FFA500]/50 mb-6"
              style={{ boxShadow: '0 0 40px rgba(255, 165, 0, 0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#FFA500] p-4 rounded-xl">
                  <Zap className="w-8 h-8 text-[#FFFFFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#FFFFFF] text-xl mb-2">🔥 Access Your Analytics Dashboards</h3>
                  <p className="text-[#B0B0B0] mb-4">
                    View real-time performance metrics, ROI calculations, and AI-powered insights across all your active services.
                  </p>
                  <motion.button
                    onClick={onViewDashboardEcosystem}
                    className="px-6 py-3 bg-[#FFA500] text-[#FFFFFF] rounded-xl border-2 border-[#FFA500]"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 165, 0, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                  >
                    Open Dashboard Ecosystem →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Support Options - Collapsible */}
            <motion.div
              className="bg-[#222222] rounded-xl border border-[#333333] mb-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button
                onClick={() => setShowSupportOptions(!showSupportOptions)}
                className="w-full flex items-center justify-between p-6 hover:bg-[#2A2A2A] transition-colors rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#5233FF]" />
                  <h3 className="text-[#FFFFFF] text-xl">Support & Assistance</h3>
                </div>
                {showSupportOptions ? (
                  <ChevronUp className="w-5 h-5 text-[#5233FF]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5233FF]" />
                )}
              </button>

              <AnimatePresence>
                {showSupportOptions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 grid md:grid-cols-2 gap-4 border-t border-[#333333] pt-6">
                      {/* Request a Call */}
                      <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#333333]">
                        <div className="flex items-start gap-3 mb-3">
                          <Phone className="w-5 h-5 text-[#5233FF] mt-1" />
                          <div className="flex-1">
                            <h4 className="text-[#FFFFFF] mb-1">Speak to an Agent</h4>
                            <p className="text-[#B0B0B0] text-sm">Get immediate assistance</p>
                          </div>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {!showCallbackInput ? (
                            <motion.button
                              key="button"
                              onClick={() => setShowCallbackInput(true)}
                              className="w-full px-4 py-2 bg-[#5233FF]/20 text-[#5233FF] rounded-lg border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all text-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Request Callback
                            </motion.button>
                          ) : (
                            <motion.div
                              key="input"
                              className="space-y-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+27"
                                className="w-full px-3 py-2 bg-[#222222] text-[#FFFFFF] rounded-lg border border-[#333333] focus:border-[#5233FF] focus:outline-none text-sm"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={handleRequestCallback}
                                  className="flex-1 px-3 py-2 bg-[#5233FF] text-[#FFFFFF] rounded-lg text-sm"
                                >
                                  ✔️ Request
                                </button>
                                <button
                                  onClick={() => {
                                    setShowCallbackInput(false);
                                    setPhoneNumber('');
                                  }}
                                  className="px-3 py-2 bg-[#333333] text-[#B0B0B0] rounded-lg text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* WhatsApp */}
                      <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#333333]">
                        <div className="flex items-start gap-3 mb-3">
                          <MessageCircle className="w-5 h-5 text-[#25D366] mt-1" />
                          <div className="flex-1">
                            <h4 className="text-[#FFFFFF] mb-1">WhatsApp Support</h4>
                            <p className="text-[#B0B0B0] text-sm">Chat with us directly</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowWhatsAppModal(true)}
                          className="w-full px-4 py-2 bg-[#25D366]/20 text-[#25D366] rounded-lg border border-[#25D366]/50 hover:bg-[#25D366]/30 transition-all text-sm"
                        >
                          Connect on WhatsApp
                        </button>
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2 bg-[#1A1A1A] rounded-xl p-5 border border-[#333333]">
                        <div className="flex items-start gap-3 mb-3">
                          <Mail className="w-5 h-5 text-[#5233FF] mt-1" />
                          <div className="flex-1">
                            <h4 className="text-[#FFFFFF] mb-1">Email Support</h4>
                            <p className="text-[#B0B0B0] text-sm">Send us a detailed message</p>
                          </div>
                        </div>
                        <a
                          href="mailto:support@kasibot.io?subject=Client Support Request"
                          className="inline-block w-full px-4 py-2 bg-[#5233FF]/20 text-[#5233FF] rounded-lg border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all text-center text-sm"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Documents Access */}
            <motion.div
              className="bg-[#222222] rounded-xl p-6 border border-[#333333] mb-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-[#5233FF]" />
                <h3 className="text-[#FFFFFF] text-xl">📁 Documents & Resources</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { name: 'Client Agreement', action: onViewAgreement },
                  { name: 'Welcome Document', action: onViewWelcome },
                  { name: 'Invoice History', action: onViewInvoices },
                  { name: 'Project Fulfillment', action: onViewFulfillment },
                ].map((doc) => (
                  <motion.button
                    key={doc.name}
                    className="px-4 py-3 bg-[#1A1A1A] text-[#B0B0B0] rounded-xl border border-[#333333] hover:border-[#5233FF]/50 hover:text-[#5233FF] transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={doc.action}
                  >
                    {doc.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="text-center pt-6 border-t border-[#333333]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <p className="text-[#B0B0B0] mb-4 text-sm">
                Powered by KasiBot.io — AI Automation That Works.
              </p>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#333333] text-[#B0B0B0] rounded-xl hover:bg-[#444444] transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWhatsAppModal(false)}
          >
            <motion.div
              className="bg-[#222222] rounded-xl p-8 border-2 border-[#5233FF]/50 max-w-md w-full shadow-[0_0_60px_rgba(82,51,255,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#25D366]/10 p-3 rounded-xl border border-[#25D366]/30">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <h3 className="text-[#FFFFFF] text-xl">📱 WhatsApp Support</h3>
              </div>
              
              <p className="text-[#B0B0B0] mb-6">
                Choose a support line to start chatting:
              </p>
              
              <div className="space-y-3">
                <a
                  href="https://wa.me/27792556417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-[#25D366]/20 text-[#25D366] rounded-xl border border-[#25D366]/50 hover:bg-[#25D366]/30 transition-all duration-300 text-center"
                >
                  +27 79 255 6417
                </a>
                
                <a
                  href="https://wa.me/27812307634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-[#25D366]/20 text-[#25D366] rounded-xl border border-[#25D366]/50 hover:bg-[#25D366]/30 transition-all duration-300 text-center"
                >
                  +27 81 230 7634
                </a>
              </div>
              
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full mt-4 px-6 py-3 bg-[#333333] text-[#B0B0B0] rounded-xl hover:bg-[#444444] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}