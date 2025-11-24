import { useState } from "react";
import { ArrowLeft, Phone, Target, Clock, AlertCircle, Users, Download, Calendar as CalendarIcon } from "lucide-react";
import { LiveCallActivity } from "./LiveCallActivity";
import { KPICard } from "./KPICard";
import { BusinessImpactCalculator } from "./BusinessImpactCalculator";
import { LeadTable } from "./LeadTable";
import { InsightsPanel } from "./InsightsPanel";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { motion } from "framer-motion";

interface VoiceAgentDashboardProps {
  onBack: () => void;
  clientName?: string;
}

export function VoiceAgentDashboard({ onBack, clientName = "Matrix Tracking Solutions" }: VoiceAgentDashboardProps) {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('month');

  // Mock data - in production this would come from API
  const liveCallData = {
    activeCallsCount: 2,
    longestCallDuration: "03:42",
    agentType: "AI + Human Routing",
    recentEvents: [
      { type: 'incoming' as const, phone: '+27 82 000 1122', timestamp: '2 min ago' },
      { type: 'completed' as const, phone: '+27 81 555 3344', duration: '01:22', timestamp: '5 min ago' },
      { type: 'missed' as const, phone: '+27 79 888 9900', timestamp: '8 min ago' },
      { type: 'transferred' as const, phone: '+27 83 444 5566', agent: 'Sarah', timestamp: '12 min ago' }
    ]
  };

  // KPI Data
  const kpiData = {
    totalCalls: 847,
    answeredRate: 97,
    missedCalls: 25,
    avgCallDuration: "2:34",
    qualifiedLeads: 156,
    responseTime: "8s"
  };

  // Charts Data
  const callsOverTimeData = [
    { time: '08:00', calls: 12 },
    { time: '09:00', calls: 28 },
    { time: '10:00', calls: 45 },
    { time: '11:00', calls: 67 },
    { time: '12:00', calls: 82 },
    { time: '13:00', calls: 71 },
    { time: '14:00', calls: 58 },
    { time: '15:00', calls: 49 },
    { time: '16:00', calls: 38 },
    { time: '17:00', calls: 22 }
  ];

  const outcomeData = [
    { name: 'Interested Lead', value: 324, color: '#00C853' },
    { name: 'Not Interested', value: 189, color: '#666666' },
    { name: 'Wrong Number', value: 87, color: '#999999' },
    { name: 'Follow-Up Required', value: 142, color: '#5233FF' },
    { name: 'Transferred', value: 78, color: '#FFA500' },
    { name: 'Missed/Abandoned', value: 27, color: '#FF5252' }
  ];

  const durationData = [
    { duration: '0-1 min', count: 145 },
    { duration: '1-2 min', count: 278 },
    { duration: '2-3 min', count: 234 },
    { duration: '3-5 min', count: 142 },
    { duration: '5+ min', count: 48 }
  ];

  // Business Impact Data
  const businessImpact = {
    missedCallsBefore: 341,
    potentialLeadsLost: 112,
    estimatedRevenueLoss: 341000,
    capturedLeads: 822,
    hoursSaved: 93,
    costSavings: 288300,
    captureRate: 97,
    aiHandledPercentage: 89,
    fteEquivalent: 0.47,
    productivityBoost: 26
  };

  // Lead Data
  const leads = [
    { 
      id: '1', 
      caller: '+27 82 123 4567', 
      date: '18/11/2024 14:32', 
      status: 'Complete' as const, 
      outcome: 'Interested', 
      estimatedValue: 8500, 
      followUpRequired: true 
    },
    { 
      id: '2', 
      caller: '+27 81 987 6543', 
      date: '18/11/2024 13:15', 
      status: 'In Progress' as const, 
      outcome: 'Follow-Up Required', 
      estimatedValue: 12000, 
      followUpRequired: true 
    },
    { 
      id: '3', 
      caller: '+27 79 555 3322', 
      date: '18/11/2024 11:48', 
      status: 'Complete' as const, 
      outcome: 'Not Interested', 
      estimatedValue: 0, 
      followUpRequired: false 
    },
    { 
      id: '4', 
      caller: '+27 83 444 1122', 
      date: '18/11/2024 10:22', 
      status: 'On Hold' as const, 
      outcome: 'Missed', 
      estimatedValue: 0, 
      followUpRequired: true 
    },
    { 
      id: '5', 
      caller: '+27 82 777 8899', 
      date: '18/11/2024 09:55', 
      status: 'Complete' as const, 
      outcome: 'Interested', 
      estimatedValue: 15000, 
      followUpRequired: false 
    },
    { 
      id: '6', 
      caller: '+27 81 333 2211', 
      date: '17/11/2024 16:40', 
      status: 'Complete' as const, 
      outcome: 'Transferred', 
      estimatedValue: 6500, 
      followUpRequired: false 
    }
  ];

  // Insights Data
  const insights = [
    {
      type: 'recommendation' as const,
      title: '💡 Peak Hour Optimization',
      message: 'Your busiest call period is between 11:00 and 13:00. Last week, missed calls during this time increased by 12%.',
      action: 'Enable automated follow-up sequencing'
    },
    {
      type: 'insight' as const,
      title: '📊 Time Savings Achievement',
      message: 'Your AI agent saved 93.4 hours this month—equal to hiring 1 part-time receptionist. Your team can now focus on high-value client interactions.',
      action: 'View detailed breakdown'
    },
    {
      type: 'alert' as const,
      title: '⚠️ After-Hours Opportunity',
      message: 'Missed calls increased by 18% during after-hours this week. Consider enabling 24/7 scheduling feature to capture these leads.',
      action: 'Upgrade to 24/7 coverage'
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
                <Phone className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h2 
                className="text-[#FFFFFF]" 
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Voice Agent Dashboard
              </h2>
            </div>

            <p 
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              {clientName} - Real-time AI receptionist analytics
            </p>
          </motion.div>

          {/* 1. Live Call Activity */}
          <LiveCallActivity {...liveCallData} />

          {/* 2. Core KPIs */}
          <div>
            <h2 className="text-[#FFFFFF] text-xl mb-6">📈 Core KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <KPICard
                icon={<Phone className="w-6 h-6" />}
                label="Calls Handled"
                value={kpiData.totalCalls}
                trend="+12%"
                trendUp={true}
              />
              <KPICard
                icon={<Target className="w-6 h-6" />}
                label="Answered Rate"
                value={kpiData.answeredRate}
                suffix="%"
                trend="+5%"
                trendUp={true}
              />
              <KPICard
                icon={<AlertCircle className="w-6 h-6" />}
                label="Missed Calls"
                value={kpiData.missedCalls}
                trend="-8%"
                trendUp={true}
              />
              <KPICard
                icon={<Clock className="w-6 h-6" />}
                label="Avg Call Duration"
                value={kpiData.avgCallDuration}
              />
              <KPICard
                icon={<Users className="w-6 h-6" />}
                label="Qualified Leads"
                value={kpiData.qualifiedLeads}
                trend="+18%"
                trendUp={true}
              />
              <KPICard
                icon={<CalendarIcon className="w-6 h-6" />}
                label="Response Time"
                value={kpiData.responseTime}
                trend="-3s"
                trendUp={true}
              />
            </div>
          </div>

          {/* 3. Performance Trends */}
          <div>
            <h2 className="text-[#FFFFFF] text-xl mb-6">📊 Performance Trends</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Calls Over Time */}
              <div 
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <h3 className="text-[#FFFFFF] mb-4">Calls Over Time (Hourly)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={callsOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis dataKey="time" stroke="#B0B0B0" />
                    <YAxis stroke="#B0B0B0" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                    <Line type="monotone" dataKey="calls" stroke="#5233FF" strokeWidth={2} dot={{ fill: '#5233FF' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Outcome Breakdown */}
              <div 
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <h3 className="text-[#FFFFFF] mb-4">Outcome Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {outcomeData.map((entry, index) => (
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

            {/* Call Duration Distribution */}
            <div 
              className="bg-[#222222] border border-[#333333] rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <h3 className="text-[#FFFFFF] mb-4">Call Duration Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="duration" stroke="#B0B0B0" />
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

          {/* 4. Business Impact */}
          <BusinessImpactCalculator {...businessImpact} />

          {/* 5. Lead Intelligence */}
          <LeadTable leads={leads} crmConnected={false} />

          {/* 6. Insights & Recommendations */}
          <InsightsPanel insights={insights} />

          {/* Footer */}
          <div className="border-t border-[#333333] pt-8 text-center">
            <p className="text-[#666666] text-sm">
              <a href="#" className="hover:text-[#5233FF] transition-colors">Support</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Documentation</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Billing</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Integrations</a>
              {' ▪ '}
              <a href="#" className="hover:text-[#5233FF] transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}