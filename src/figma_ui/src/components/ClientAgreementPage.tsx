import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

interface ClientAgreementPageProps {
  onNext?: () => void;
}

export function ClientAgreementPage({ onNext }: ClientAgreementPageProps) {
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
                  🧾 CLIENT SERVICE AGREEMENT
                </h1>
                <p 
                  className="text-[#5233FF] text-center mb-1" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}
                >
                  KASIBOT.IO (PTY) LTD — MATRIX PARTNERSHIP
                </p>
                <p 
                  className="text-[#B0B0B0] text-center" 
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                >
                  Proudly South African | Powered by Local Innovation | Supporting National Growth
                </p>
              </motion.div>

              {/* Document Body */}
              <motion.div 
                className="px-8 py-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {/* Agreement Information */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    AGREEMENT INFORMATION
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Agreement Number:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          [Auto-generated]
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Date:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          __________________________
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                        Initial Contract Term:
                      </p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> 3 Months
                        </label>
                        <label className="flex items-center gap-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> 6 Months
                        </label>
                        <label className="flex items-center gap-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> 12 Months
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Parties */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    1. PARTIES
                  </h3>
                  
                  {/* Service Provider */}
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <h4 className="text-[#5233FF] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      Service Provider (Agency)
                    </h4>
                    <div className="space-y-2">
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        Kasibot.io (Pty) Ltd / Matrix Partnership
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        Registration: _______________________
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        Address: Pretoria, Gauteng, South Africa
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        Email: info@kasibot.io
                      </p>
                    </div>
                  </div>

                  {/* Client */}
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <h4 className="text-[#5233FF] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      Client
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Company Name:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Registration / ID:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          VAT Number:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Address:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Contact Person:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Email:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Contact Number:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Services Provided */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    2. SERVICES PROVIDED
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Services included in this Agreement must match the attached Statement of Work (SOW).
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          AI Voice Receptionist • Call Answering • Routing
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          AI Chatbot (Website / WhatsApp)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Lead Qualification & CRM Flow Automation
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Appointment Booking System
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          n8n / Zapier / API Workflow Automation
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Website Design & Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Digital Marketing / Paid Ads / Branding
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#5233FF]" style={{ fontSize: '1.2rem' }}>☑</span>
                        <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          Custom AI & Integration Solutions
                        </span>
                      </div>
                    </div>
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      Note: All features, limits, customisation levels and responsibilities are defined in the SOW and/or selected package.
                    </p>
                  </div>
                </div>

                {/* 3. Project Timeline & Milestones */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    3. PROJECT TIMELINE & MILESTONES
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Project Start Date:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Estimated Go-Live:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          ___________________________________
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Phase</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Description</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Target</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Discovery</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Requirements & strategy</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Week 1</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Design</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>UI/UX • Scripts • Flows • Architecture</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Week 2–3</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Build</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>AI + Website + Integrations</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Week 4–6</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Testing</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>UAT + Fixes</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Week 7</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Deployment</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Launch + Training + Handover</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Week 8</p>
                      </div>
                    </div>
                    
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      Deadlines rely on timely Client feedback (see Section 6).
                    </p>
                  </div>
                </div>

                {/* 4. Investment & Payment Terms */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    4. INVESTMENT & PAYMENT TERMS
                  </h3>
                  
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <h4 className="text-[#5233FF] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      4.1 Project Investment
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>One-Time Setup:</p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>R________________________</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Monthly Recurring Subscription:</p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>R________________________</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>Total Project Investment:</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>R________________________</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <h4 className="text-[#5233FF] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      4.2 Billing Model (Select One)
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> Once-off Project
                        </label>
                        <div className="ml-6 space-y-1 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          <p>• 50% deposit on signing</p>
                          <p>• 25% after mid-project milestone</p>
                          <p>• 25% on completion</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> Subscription Model
                        </label>
                        <div className="ml-6 space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Setup Fee: R________________</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Monthly Fee: R________________</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Billing Date:</p>
                            <label className="flex items-center gap-1 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                              <span className="w-3 h-3 border border-[#5233FF] rounded"></span> 1st
                            </label>
                            <label className="flex items-center gap-1 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                              <span className="w-3 h-3 border border-[#5233FF] rounded"></span> 15th monthly
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          <span className="w-4 h-4 border border-[#5233FF] rounded"></span> Hybrid Model
                        </label>
                        <p className="ml-6 text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Setup + Monthly Subscription</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <h4 className="text-[#5233FF] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      4.3 Payment Rules
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Work starts only after deposit clears.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">���</span>
                        <span>Recurring payments require enrolled debit order or client portal billing.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Late payments beyond 7 days may result in system pause.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>After 30 days non-payment, Kasibot may terminate all services and revoke operational access.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 5. Service Level Agreement */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    5. SERVICE LEVEL AGREEMENT (SLA)
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Category</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Response</p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>Resolution Target</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>System Down</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 24h</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 48h</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Core Feature Issue</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 24h</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 48h</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Minor Issue</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 48h</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 72h</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>General Query</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 48h</p>
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>&lt; 96h</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t border-[#333333]">
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • Scheduled maintenance: Max 4 hours/month with 48-hour notice.
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • AI systems operate 24/7/365.
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • Human support is available during business hours with extended emergency escalation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6. Client Responsibilities */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    6. CLIENT RESPONSIBILITIES
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <p className="text-[#B0B0B0] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                      Client agrees to:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Provide required access (domains, WhatsApp API, CRM, emails, etc.)</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Supply content and approvals within 7–10 business days</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Maintain valid billing credentials</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">✔</span>
                        <span>Respond to testing confirmations promptly</span>
                      </li>
                    </ul>
                    <p className="text-[#5233FF] mt-4 italic" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                      Failure to comply may delay timelines — Kasibot is not liable for delays caused by the Client.
                    </p>
                  </div>
                </div>

                {/* 7. Intellectual Property */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    7. INTELLECTUAL PROPERTY & ACCESS RIGHTS
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333] space-y-4">
                    <div>
                      <h4 className="text-[#5233FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                        Before Full Payment:
                      </h4>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        All systems, data routing, numbers, configuration files and digital assets remain the property of Kasibot.io.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-[#5233FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                        After Full Payment:
                      </h4>
                      <p className="text-[#B0B0B0] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        The Client owns all custom-created deliverables (website, personalised AI script, workflows unique to the business).
                      </p>
                      <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        Kasibot retains:
                      </p>
                      <ul className="ml-6 space-y-1">
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          • Underlying AI frameworks, reusable libraries, prompt engines and internal modules
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          • Administrative access to ensure platform integrity
                        </li>
                        <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          • Right to disable access if contractual or billing breach occurs
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-[#5233FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                        Shared Rights:
                      </h4>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        Domains, WhatsApp Business API Numbers, CRM licenses and third-party subscriptions purchased under the client's legal entity belong to the Client.
                      </p>
                      <p className="text-[#B0B0B0] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        Kasibot may use anonymised results and system structure as a case study unless the Client opts out in writing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 8. Confidentiality */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    8. CONFIDENTIALITY & DATA PROTECTION
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>Governed by POPIA & international cybersecurity best practice.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>All confidential information is protected and may not be shared without consent.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>Any data breach will be communicated within 72 hours.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 9. Termination */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    9. TERMINATION & RENEWAL
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>Contract renews month-to-month after initial term unless cancelled with 30-day written notice.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>If the Client terminates early during the initial term, a two-month termination fee applies.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>Kasibot may terminate immediately for non-payment, operational abuse or breach.</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">•</span>
                        <span>Upon termination, client data will be exportable for 30 days.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 10. Dispute Resolution */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    10. DISPUTE RESOLUTION & LEGAL
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <ul className="space-y-2 mb-4">
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">First:</span>
                        <span>good faith conversation</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">Second:</span>
                        <span>mediation</span>
                      </li>
                      <li className="text-[#B0B0B0] flex items-start gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        <span className="text-[#5233FF] mt-1">Third:</span>
                        <span>arbitration under AFSA</span>
                      </li>
                    </ul>
                    <div className="pt-4 border-t border-[#333333] space-y-1">
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        Governing law: Republic of South Africa
                      </p>
                      <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        Jurisdiction: Pretoria High Court
                      </p>
                    </div>
                  </div>
                </div>

                {/* 11. Signatures */}
                <div className="space-y-6 pt-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    11. AGREEMENT SIGNATURES
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Client Signature */}
                    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                      <p className="text-[#5233FF] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                        CLIENT SIGNATURE:
                      </p>
                      <div className="border-b border-[#5233FF]/30 pb-12 mb-4"></div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Name:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Position:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Date:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Kasibot Signature */}
                    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                      <p className="text-[#5233FF] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                        KASIBOT.IO SIGNATURE:
                      </p>
                      <div className="border-b border-[#5233FF]/30 pb-12 mb-4"></div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Name:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Position:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                            Date:
                          </p>
                          <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            ___________________________________
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <motion.div 
                  className="pt-8 border-t border-[#333333] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <p className="text-[#5233FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                    Kasibot.io
                  </p>
                  <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                    Proudly South African • Powered by Local Innovation • Supporting National Growth
                  </p>
                  <p className="text-[#B0B0B0] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                    www.kasibot.io • info@kasibot.io
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
                        Next
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