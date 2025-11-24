import { ArrowLeft, Phone, Mail, Share2, Users, Globe, MessageCircle, Zap, Calendar, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface DashboardEcosystemProps {
  onBack: () => void;
  onNavigateToVoice: () => void;
  onNavigateToEmail: () => void;
}

export function DashboardEcosystem({ onBack, onNavigateToVoice, onNavigateToEmail }: DashboardEcosystemProps) {
  const dashboards = [
    {
      id: 1,
      title: "Voice Agent Dashboard",
      icon: <Phone className="w-8 h-8" />,
      color: "#5233FF",
      status: "active" as const,
      description: "Track AI receptionist performance, call outcomes, savings & ROI",
      metrics: ["Total Calls", "Answered Rate", "Qualified Leads", "Response Time", "Cost Savings", "Hours Saved"],
      onClick: onNavigateToVoice
    },
    {
      id: 2,
      title: "Email Agent Dashboard",
      icon: <Mail className="w-8 h-8" />,
      color: "#5233FF",
      status: "active" as const,
      description: "Display inbox automation results, time saved & categorization insights",
      metrics: ["Emails Received", "Auto-Handled %", "Response Time", "Categorization Accuracy", "Hours Saved", "ROI"],
      onClick: onNavigateToEmail
    },
    {
      id: 3,
      title: "Social Media / Digital Marketing Dashboard",
      icon: <Share2 className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "Content automation, social scheduling & engagement AI analytics",
      metrics: ["Impressions & Reach", "Engagement Rate", "Time Saved", "Leads Generated", "Best Performing Posts", "AI Recommendations"],
      unlockCondition: "Social + Marketing Services"
    },
    {
      id: 4,
      title: "CRM & Lead Pipeline Dashboard",
      icon: <Users className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "CRM automation, deal tracking & workflow integrations",
      metrics: ["Total Leads", "Qualified Leads", "Conversion Rate", "Sales Cycle Duration", "Auto Follow-ups", "Bookings Triggered"],
      unlockCondition: "CRM + Sales Workflow Automation"
    },
    {
      id: 5,
      title: "Website & Performance Dashboard",
      icon: <Globe className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "Web development, hosting & performance analytics",
      metrics: ["Traffic & Visitors", "Page Load Speed", "Form Submissions", "SEO Rankings", "Bounce Rate", "AI Insights"],
      unlockCondition: "Website hosted or tracked via Kasibot"
    },
    {
      id: 6,
      title: "WhatsApp Business / Chatbot Dashboard",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "WhatsApp automation, inbound messaging & sales bots",
      metrics: ["Messages Received", "Auto-Responses", "Human Handovers", "Lead Conversion", "Sentiment Analysis", "Response Accuracy"],
      unlockCondition: "WhatsApp Automation active"
    },
    {
      id: 7,
      title: "Automation Workflow Health Dashboard",
      icon: <Zap className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "Complex n8n / Zapier / API automation monitoring",
      metrics: ["System Uptime", "Execution Success %", "Tasks Completed", "Efficiency Score", "Failed Jobs", "Hours Saved"],
      unlockCondition: "Automation Subscription"
    },
    {
      id: 8,
      title: "Appointment & Bookings Dashboard",
      icon: <Calendar className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "Appointment-based business tracking & AI scheduling",
      metrics: ["Total Bookings", "No-Show Rate", "AI vs Human Bookings", "Calendar Utilisation", "Reminder Success Rate", "Revenue Impact"],
      unlockCondition: "AI Scheduling or Booking Systems"
    },
    {
      id: 9,
      title: "E-commerce & Sales Automation Dashboard",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "#FFA500",
      status: "coming-soon" as const,
      description: "Shopify/WooCommerce integration & sales automation",
      metrics: ["Total Purchases", "Abandoned Carts Recovered", "Avg Order Value", "Customer Lifetime Value", "Support Automation", "AI Upsells"],
      unlockCondition: "E-commerce Automation"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FFFFFF] relative overflow-hidden">
      {/* Animated background particles */}
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

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Top Card - Title Section */}
          <motion.div 
            className="bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-8 shadow-[0_0_40px_rgba(82,51,255,0.2)] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

            {/* Title */}
            <h2 
              className="text-[#FFFFFF] mb-3" 
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
            >
              🔥 KASIBOT DASHBOARD ECOSYSTEM
            </h2>

            <p 
              className="text-[#B0B0B0]"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              Access all your AI automation analytics in one place
            </p>
          </motion.div>

          {/* Bottom Card - Info Section */}
          <motion.div 
            className="bg-[#222222] border border-[#333333] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5233FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)' }}
              >
                <Zap className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-[#FFFFFF] mb-1" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}
                >
                  Powered by KASIBOT.IO (PTY) LTD
                </h3>
                <p className="text-[#B0B0B0]">
                  Real-time analytics, ROI tracking & AI-powered insights
                </p>
              </div>
            </div>
            <p className="text-[#B0B0B0] text-sm leading-relaxed">
              📍 <span className="text-[#FFFFFF]">Modular System:</span> Dashboards automatically unlock when you purchase the corresponding service. 
              Each dashboard provides comprehensive performance metrics and business intelligence tailored to your active AI services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dashboards.map((dashboard) => (
              <motion.div
                key={dashboard.id}
                className={`relative rounded-xl p-6 border transition-all duration-300 ${
                  dashboard.status === 'active'
                    ? 'bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-[#5233FF]/50 hover:border-[#5233FF] cursor-pointer'
                    : 'bg-[#222222] border-[#333333] hover:border-[#FFA500]/50'
                }`}
                style={{ 
                  boxShadow: dashboard.status === 'active' 
                    ? '0 0 30px rgba(82, 51, 255, 0.2)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.3)' 
                }}
                onClick={dashboard.status === 'active' ? dashboard.onClick : undefined}
                whileHover={{ scale: dashboard.status === 'active' ? 1.02 : 1 }}
                whileTap={{ scale: dashboard.status === 'active' ? 0.98 : 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dashboard.id * 0.1 }}
              >
                {/* Coming Soon Banner */}
                {dashboard.status === 'coming-soon' && (
                  <div className="absolute top-4 right-4 bg-[#FFA500] text-[#1A1A1A] px-3 py-1 rounded-lg text-xs">
                    Coming Soon
                  </div>
                )}

                {/* Active Badge */}
                {dashboard.status === 'active' && (
                  <div className="absolute top-4 right-4 bg-[#00C853] text-[#FFFFFF] px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    ✓ Active
                  </div>
                )}

                {/* Icon */}
                <div 
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                    dashboard.status === 'active'
                      ? 'bg-[#5233FF]'
                      : 'bg-[#333333]'
                  }`}
                  style={{ 
                    color: dashboard.status === 'active' ? '#FFFFFF' : '#666666',
                    boxShadow: dashboard.status === 'active' ? '0 0 20px rgba(82, 51, 255, 0.3)' : 'none'
                  }}
                >
                  {dashboard.icon}
                </div>

                {/* Title */}
                <h3 className={`text-xl mb-2 ${
                  dashboard.status === 'active' ? 'text-[#FFFFFF]' : 'text-[#B0B0B0]'
                }`}>
                  {dashboard.title}
                </h3>

                {/* Description */}
                <p className="text-[#666666] text-sm mb-4">
                  {dashboard.description}
                </p>

                {/* Metrics */}
                <div className="mb-4">
                  <p className="text-[#B0B0B0] text-xs mb-2">Key Metrics:</p>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.metrics.slice(0, 4).map((metric, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          dashboard.status === 'active'
                            ? 'bg-[#5233FF]/20 text-[#5233FF] border border-[#5233FF]/30'
                            : 'bg-[#333333] text-[#666666] border border-[#444444]'
                        }`}
                      >
                        {metric}
                      </span>
                    ))}
                    {dashboard.metrics.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded bg-[#333333] text-[#666666] border border-[#444444]">
                        +{dashboard.metrics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Unlock Condition */}
                {dashboard.status === 'coming-soon' && dashboard.unlockCondition && (
                  <div className="text-xs text-[#666666] border-t border-[#333333] pt-3">
                    🔒 <span className="text-[#B0B0B0]">Unlock condition:</span> {dashboard.unlockCondition}
                  </div>
                )}

                {/* Call to Action */}
                {dashboard.status === 'active' && (
                  <div className="text-[#5233FF] text-sm mt-3 flex items-center justify-between">
                    <span>View Dashboard</span>
                    <span>→</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}