import { motion } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft } from 'lucide-react';

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  billingPeriod: string;
  dueDate: string;
  status: 'PAID' | 'DUE' | 'OVERDUE';
  client: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
  };
  services: Array<{
    name: string;
    quantity: number;
    price: string;
    lineTotal: string;
  }>;
  subtotal: string;
  discount?: string;
  vat: string;
  total: string;
  planName: string;
}

interface InvoicePageProps {
  invoice: InvoiceData;
  onBack: () => void;
}

export function InvoicePage({ invoice, onBack }: InvoicePageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'DUE':
        return 'text-[#5233FF] bg-[#5233FF]/10 border-[#5233FF]/30';
      case 'OVERDUE':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      default:
        return 'text-[#B0B0B0] bg-[#333333]/10 border-[#333333]/30';
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

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-[#222222] rounded-xl border border-[#5233FF]/30 text-[#5233FF] hover:bg-[#5233FF]/10 transition-all duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Back to Invoices</span>
      </motion.button>

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
                <div className="flex justify-between items-start">
                  <div>
                    <h1 
                      className="text-[#FFFFFF] mb-2" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
                    >
                      🧾 INVOICE
                    </h1>
                    <p 
                      className="text-[#5233FF] mb-1" 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}
                    >
                      {invoice.client.companyName}
                    </p>
                    <p 
                      className="text-[#B0B0B0]" 
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                    >
                      Powered by KASIBOT.IO (PTY) LTD
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border ${getStatusColor(invoice.status)}`}>
                    <span 
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Document Body */}
              <motion.div 
                className="px-8 py-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {/* Invoice Details */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    📌 Invoice Details
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Invoice Number:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                          {invoice.invoiceNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Invoice Date:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          {invoice.invoiceDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Billing Period:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          {invoice.billingPeriod}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Due Date:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          {invoice.dueDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billed To */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    👤 Billed To
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Company Name:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          {invoice.client.companyName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Contact Person:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          {invoice.client.contactName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Email:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          {invoice.client.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Phone:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          {invoice.client.phone}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                          Billing Address:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                          {invoice.client.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Summary */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    🧾 Service Summary
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="space-y-3">
                      {/* Table Header */}
                      <div className="grid grid-cols-4 gap-4 pb-2 border-b border-[#333333]">
                        <p className="col-span-2 text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                          Product / Service
                        </p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                          Quantity
                        </p>
                        <p className="text-[#5233FF] text-right" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                          Line Total
                        </p>
                      </div>
                      
                      {/* Services */}
                      {invoice.services.map((service, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 py-2">
                          <div className="col-span-2">
                            <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                              {service.name}
                            </p>
                            <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                              @ {service.price}
                            </p>
                          </div>
                          <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            {service.quantity}
                          </p>
                          <p className="text-[#FFFFFF] text-right" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                            {service.lineTotal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    💰 Totals
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          Subtotal:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
                          {invoice.subtotal}
                        </p>
                      </div>
                      
                      {invoice.discount && (
                        <div className="flex justify-between items-center">
                          <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                            Discount:
                          </p>
                          <p className="text-green-500" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
                            -{invoice.discount}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                          VAT 15%:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
                          {invoice.vat}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-[#333333]">
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                          Total Amount Due:
                        </p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                          {invoice.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Notes */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    🔁 Subscription Notes
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • This invoice reflects your active subscription for: <span className="text-[#5233FF]">{invoice.planName}</span>
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • Billing frequency: Monthly, in advance
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • Invoices remain accessible in your client portal under Billing → Invoice History
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        • A downloadable PDF copy is available for your records
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    🏦 Payment Information
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Business Name:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          KASIBOT (PTY) LTD
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Reg No.:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          2025/662760/07
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          VAT No.:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          9808502190
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Bank:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Capitec Bank
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Account Name:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Capitec Business Account
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Account Type:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          Business Transact
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Account Number:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          1054138311
                        </p>
                      </div>
                      <div>
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Branch Code:
                        </p>
                        <p className="text-[#FFFFFF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                          450105
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[#B0B0B0] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                          Reference:
                        </p>
                        <p className="text-[#5233FF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                          {invoice.client.companyName} + {invoice.invoiceNumber}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[#333333]">
                      <p className="text-[#5233FF]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        📍 Payment is required before or on the due date to avoid service interruption.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <h3 
                    className="text-[#FFFFFF] border-b border-[#333333] pb-2" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                  >
                    📄 Terms & Conditions
                  </h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333333]">
                    <ul className="space-y-2">
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • Payments are billed in advance each month.
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • Subscription continues until cancelled with written notice (subject to agreement terms).
                      </li>
                      <li className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                        • Setup, configuration, regulatory or integration fees (if charged) are non-refundable.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Thank You */}
                <div className="bg-gradient-to-r from-[#5233FF]/20 to-[#5233FF]/10 rounded-xl p-8 border border-[#5233FF]/30 text-center">
                  <h3 
                    className="text-[#FFFFFF] mb-4" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                  >
                    🤝 Thank You
                  </h3>
                  <p className="text-[#B0B0B0] leading-relaxed max-w-3xl mx-auto mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    We appreciate your partnership. Your AI systems continue to run and improve every day — helping reduce missed calls, 
                    streamline communication and elevate customer experience.
                  </p>
                  <p className="text-[#5233FF] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
                    Kasibot.io — Always On. Always Answering.
                  </p>
                  <div className="space-y-1">
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                      Support: support@kasibot.io
                    </p>
                    <p className="text-[#B0B0B0]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                      Website: www.kasibot.io
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
}