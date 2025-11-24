import { useState } from "react";
import { ArrowLeft, Mail, Target, Clock, CheckCircle, TrendingUp, Download, Filter } from "lucide-react";
import { LiveEmailActivity } from "./LiveEmailActivity";
import { KPICard } from "./KPICard";
import { EmailBusinessImpact } from "./EmailBusinessImpact";
import { EmailQueueTable } from "./EmailQueueTable";
import { InsightsPanel } from "./InsightsPanel";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

interface EmailAgentDashboardProps {
  onBack: () => void;
  clientName?: string;
}

export function EmailAgentDashboard({ onBack, clientName = "Matrix Tracking Solutions" }: EmailAgentDashboardProps) {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('month');

  // Live Email Activity Data
  const liveEmailData = {
    receivedToday: 124,
    autoRepliesSent: 87,
    awaitingAction: 15,
    priorityFlagged: 8,
    recentEvents: [
      { type: 'received' as const, message: 'New email from sales@clientdomain.com — classified as "Quotation Request"', timestamp: '2 min ago' },
      { type: 'urgent' as const, message: 'Marked urgent — awaiting manual approval', timestamp: '4 min ago' },
      { type: 'auto-replied' as const, message: 'Auto-responded: "Thank you, we received your message."', timestamp: '6 min ago' },
      { type: 'followup' as const, message: 'Follow-up sent to supplier@domain.com', timestamp: '10 min ago' }
    ]
  };

  // KPI Data
  const kpiData = {
    totalReceived: 3842,
    autoHandledPercentage: 73,
    humanRequired: 1038,
    avgResponseTime: 12,
    categorizationAccuracy: 94,
    automatedFollowUps: 542
  };

  // Charts Data
  const emailVolumeData = [
    { time: '08:00', emails: 32 },
    { time: '09:00', emails: 58 },
    { time: '10:00', emails: 74 },
    { time: '11:00', emails: 89 },
    { time: '12:00', emails: 67 },
    { time: '13:00', emails: 52 },
    { time: '14:00', emails: 71 },
    { time: '15:00', emails: 63 },
    { time: '16:00', emails: 45 },
    { time: '17:00', emails: 28 }
  ];

  const categoryData = [
    { name: 'Sales / Quotes', value: 1652, color: '#00C853' },
    { name: 'Support Tickets', value: 894, color: '#5233FF' },
    { name: 'Urgent / Escalation', value: 342, color: '#FF5252' },
    { name: 'Spam / Noise', value: 287, color: '#666666' },
    { name: 'Accounts / Billing', value: 412, color: '#FFA500' },
    { name: 'Supplier / Operations', value: 255, color: '#9C27B0' }
  ];

  const responseTimeData = [
    { time: '0-5 min', count: 1842 },
    { time: '5-15 min', count: 1156 },
    { time: '15-30 min', count: 524 },
    { time: '30-60 min', count: 218 },
    { time: '60+ min', count: 102 }
  ];

  // Business Impact Data
  const businessImpact = {
    emailsMissedBefore: 287,
    hoursPreviouslySpent: 156,
    operationalCostBefore: 42000,
    workloadReduced: 73,
    hoursSaved: 114,
    salarySavings: 31200,
    automationEfficiency: 94,
    emailsFullyAutomated: 73,
    semiAutomated: 18,
    followUpTriggered: 542
  };

  // Email Queue Data
  const emails = [
    {
      id: '1',
      sender: 'info@clientcompany.com',
      subject: 'Invoice Attached - Payment Due',
      category: 'Accounts' as const,
      actionStatus: 'Complete' as const,
      priority: 'normal' as const,
      followUpRequired: false,
      timestamp: 'Today 14:32'
    },
    {
      id: '2',
      sender: 'urgent@customer.com',
      subject: 'URGENT: Return Request for Order #12345',
      category: 'Urgent' as const,
      actionStatus: 'In Progress' as const,
      priority: 'high' as const,
      followUpRequired: true,
      timestamp: 'Today 13:15'
    },
    {
      id: '3',
      sender: 'sales@prospect.co.za',
      subject: 'Re: Quotation Request for Fleet Tracking',
      category: 'Sales' as const,
      actionStatus: 'Complete' as const,
      priority: 'normal' as const,
      followUpRequired: false,
      timestamp: 'Today 11:48'
    },
    {
      id: '4',
      sender: 'support@vendor.com',
      subject: 'System Maintenance Notification',
      category: 'Support' as const,
      actionStatus: 'Complete' as const,
      priority: 'low' as const,
      followUpRequired: false,
      timestamp: 'Today 10:22'
    },
    {
      id: '5',
      sender: 'billing@supplier.com',
      subject: 'Monthly Statement - November 2024',
      category: 'Accounts' as const,
      actionStatus: 'Complete' as const,
      priority: 'normal' as const,
      followUpRequired: false,
      timestamp: 'Today 09:55'
    },
    {
      id: '6',
      sender: 'spam@unknown.net',
      subject: 'Win a Free iPhone Now!!!',
      category: 'Spam' as const,
      actionStatus: 'Complete' as const,
      priority: 'low' as const,
      followUpRequired: false,
      timestamp: 'Today 08:12'
    }
  ];

  // Insights Data
  const insights = [
    {
      type: 'insight' as const,
      title: '📊 Sales Email Dominance',
      message: '43% of emails are classified as Sales-Related. Consider enabling automated quote replies to improve customer response time and capture more leads.',
      action: 'Enable Auto-Quote System'
    },
    {
      type: 'alert' as const,
      title: '⚠️ Urgent Message Spike',
      message: 'Your inbox saw a 28% increase in urgent messages this week. Recommend enabling escalation routing between 7PM–10PM to ensure 24/7 coverage.',
      action: 'Set up after-hours routing'
    },
    {
      type: 'recommendation' as const,
      title: '✨ Productivity Achievement',
      message: 'Your AI agent saved the team 114 working hours this month — equivalent to hiring an additional full-time email administrator. ROI: R31,200 in salary savings.',
      action: 'View detailed ROI report'
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
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Top Card - Title Section */}
          <motion.div 
            className="bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-8 shadow-[0_0_40px_rgba(82,51,255,0.2)]"
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
              Back to Dashboard Ecosystem
            </button>

            {/* Title with Icon */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5233FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)' }}
              >
                <Mail className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h2 
                className="text-[#FFFFFF]" 
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Email Agent Dashboard
              </h2>
            </div>

            <p 
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              {clientName} - Real-time email automation & inbox intelligence
            </p>
          </motion.div>

          {/* 1. Live Email Activity */}
          <LiveEmailActivity {...liveEmailData} />

          {/* 2. Core KPIs */}
          <div>
            <h2 className="text-[#FFFFFF] text-xl mb-6">📊 Core KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <KPICard
                icon={<Mail className="w-6 h-6" />}
                label="Total Emails Received"
                value={kpiData.totalReceived}
                trend="+15%"
                trendUp={true}
              />
              <KPICard
                icon={<CheckCircle className="w-6 h-6" />}
                label="Auto-Handled Percentage"
                value={kpiData.autoHandledPercentage}
                suffix="%"
                trend="+8%"
                trendUp={true}
              />
              <KPICard
                icon={<Target className="w-6 h-6" />}
                label="Human-Required Emails"
                value={kpiData.humanRequired}
                trend="-12%"
                trendUp={true}
              />
              <KPICard
                icon={<Clock className="w-6 h-6" />}
                label="Avg Response Time"
                value={kpiData.avgResponseTime}
                suffix=" mins"
                trend="-3 min"
                trendUp={true}
              />
              <KPICard
                icon={<TrendingUp className="w-6 h-6" />}
                label="Emails Categorized Correctly"
                value={kpiData.categorizationAccuracy}
                suffix="%"
              />
              <KPICard
                icon={<Mail className="w-6 h-6" />}
                label="Automated Follow-Ups"
                value={kpiData.automatedFollowUps}
                trend="+22%"
                trendUp={true}
              />
            </div>
          </div>

          {/* 3. Inbox Intelligence Overview */}
          <div>
            <h2 className="text-[#FFFFFF] text-xl mb-6">📊 Inbox Intelligence Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Email Volume Timeline */}
              <div 
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <h3 className="text-[#FFFFFF] mb-4">Email Volume Timeline (Hourly)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={emailVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis dataKey="time" stroke="#B0B0B0" />
                    <YAxis stroke="#B0B0B0" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                    <Line type="monotone" dataKey="emails" stroke="#5233FF" strokeWidth={2} dot={{ fill: '#5233FF' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div 
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <h3 className="text-[#FFFFFF] mb-4">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name.split(' / ')[0]}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Response Time Histogram */}
            <div 
              className="bg-[#222222] border border-[#333333] rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <h3 className="text-[#FFFFFF] mb-4">Response Time Histogram</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="time" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="count" fill="#5233FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Automation & Business Impact */}
          <EmailBusinessImpact {...businessImpact} />

          {/* 5. Email Categorization & Queue Status */}
          <EmailQueueTable emails={emails} crmConnected={false} />

          {/* 6. Insights & Recommendations */}
          <InsightsPanel insights={insights} />

          {/* Footer */}
          <div className="border-t border-[#333333] pt-8 text-center">
            <p className="text-[#666666] text-sm">
              <a href="#" className="hover:text-[#5233FF] transition-colors">Support</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Billing</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Help Center</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Documentation</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">API Access</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Legal</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}