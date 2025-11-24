import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';
import { FileText, Calendar, DollarSign } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  billingPeriod: string;
  total: string;
  status: 'PAID' | 'DUE' | 'OVERDUE';
}

interface InvoiceListPageProps {
  invoices: Invoice[];
  onSelectInvoice: (invoiceId: string) => void;
  onNext?: () => void;
}

export function InvoiceListPage({ invoices, onSelectInvoice, onNext }: InvoiceListPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-500';
      case 'DUE':
        return 'text-[#5233FF]';
      case 'OVERDUE':
        return 'text-red-500';
      default:
        return 'text-[#B0B0B0]';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/10 border-green-500/30';
      case 'DUE':
        return 'bg-[#5233FF]/10 border-[#5233FF]/30';
      case 'OVERDUE':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-[#333333]/10 border-[#333333]/30';
    }
  };

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
            {/* Container */}
            <div className="bg-[#222222] rounded-xl border-2 border-[#5233FF]/30 shadow-[0_0_60px_rgba(82,51,255,0.2)] overflow-hidden">
              {/* Header */}
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
                  📋 Invoice History
                </h1>
                <p 
                  className="text-[#B0B0B0] text-center" 
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}
                >
                  View and access all your invoices
                </p>
              </motion.div>

              {/* Body */}
              <motion.div 
                className="px-8 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <div className="space-y-4">
                  {invoices.map((invoice, index) => (
                    <motion.button
                      key={invoice.id}
                      onClick={() => onSelectInvoice(invoice.id)}
                      className="w-full bg-[#1A1A1A] rounded-xl p-6 border border-[#333333] hover:border-[#5233FF]/50 transition-all duration-300 text-left group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(82, 51, 255, 0.2)' }}
                    >
                      <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-[#5233FF]/10 p-3 rounded-xl border border-[#5233FF]/30 group-hover:bg-[#5233FF]/20 transition-all duration-300">
                            <FileText className="w-6 h-6 text-[#5233FF]" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 
                                className="text-[#FFFFFF]" 
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                              >
                                {invoice.invoiceNumber}
                              </h3>
                              <div className={`px-3 py-1 rounded-xl border ${getStatusBg(invoice.status)}`}>
                                <span 
                                  className={getStatusColor(invoice.status)} 
                                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600 }}
                                >
                                  {invoice.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#5233FF]" />
                                <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                                  {invoice.date}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                                  Period: {invoice.billingPeriod}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                              Total Amount
                            </p>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-[#5233FF]" />
                              <span 
                                className="text-[#FFFFFF]" 
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                              >
                                {invoice.total}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-[#5233FF] group-hover:translate-x-1 transition-transform duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
                {onNext && (
                  <motion.div 
                    className="flex justify-center pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
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
                        Continue to Dashboard
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