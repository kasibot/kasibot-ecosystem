import { useState, useMemo } from "react";
import { ArrowLeft, Phone, Target, Clock, AlertCircle, Users, Download, Calendar as CalendarIcon } from "lucide-react";
import { LiveCallActivity } from "@/components/LiveCallActivity";
import KpiCard from "@/components/KpiCard";
import { BusinessImpactCalculator } from "@/components/BusinessImpactCalculator";
import { LeadTable } from "@/components/LeadTable";
import { InsightsPanel } from "@/components/InsightsPanel";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { motion } from "motion/react";
import { useUserMetadata } from "@/lib/clerk";
import { useCalls, useDailyStats, useChartData, useOutcomeData } from "@/hooks";
import { formatDuration, formatCurrency } from "@/lib/utils";

interface VoiceAgentDashboardProps {
  onBack: () => void;
  clientName?: string;
}

export function VoiceAgentDashboard({ onBack, clientName }: VoiceAgentDashboardProps) {
  const metadata = useUserMetadata();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('month');
  
  // Map dateRange to TimeFilter
  const timeFilter = dateRange === 'today' ? 'day' : dateRange === 'week' ? 'week' : dateRange === 'month' ? 'month' : 'month';
  const callFilter = dateRange === 'today' ? 'today' : dateRange === 'week' ? '7days' : dateRange === 'month' ? '30days' : '30days';

  const { calls, loading: callsLoading } = useCalls(metadata?.clientId, callFilter);
  const { stats, loading: statsLoading } = useDailyStats(metadata?.clientId);
  const { data: chartData, loading: chartLoading } = useChartData(metadata?.clientId, timeFilter);
  const { data: outcomeData, loading: outcomeLoading } = useOutcomeData(metadata?.clientId);

  // Calculate live call data from real calls
  const liveCallData = useMemo(() => {
    const activeCalls = calls.filter(c => {
      const callTime = new Date(c.timestamp);
      const now = new Date();
      const diffMinutes = (now.getTime() - callTime.getTime()) / (1000 * 60);
      return diffMinutes < 5 && c.status === 'answered';
    });

    const recentEvents = calls
      .slice(0, 5)
      .map(call => {
        const callTime = new Date(call.timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - callTime.getTime()) / (1000 * 60));
        const timestamp = diffMinutes < 1 ? 'Just now' : `${diffMinutes} min ago`;

        if (call.status === 'answered') {
          return {
            type: 'completed' as const,
            phone: call.phone,
            duration: formatDuration(call.duration_seconds),
            timestamp
          };
        } else if (call.status === 'missed') {
          return {
            type: 'missed' as const,
            phone: call.phone,
            timestamp
          };
        } else {
          return {
            type: 'incoming' as const,
            phone: call.phone,
            timestamp
          };
        }
      });

    const longestCall = calls
      .filter(c => c.status === 'answered')
      .reduce((longest, c) => c.duration_seconds > longest.duration_seconds ? c : longest, calls[0] || { duration_seconds: 0 });

    return {
      activeCallsCount: activeCalls.length,
      longestCallDuration: longestCall ? formatDuration(longestCall.duration_seconds) : '00:00',
      agentType: 'AI + Human Routing',
      recentEvents: recentEvents.slice(0, 4)
    };
  }, [calls]);

  // Calculate KPI Data from real data
  const kpiData = useMemo(() => {
    const totalCalls = calls.length;
    const answeredCalls = calls.filter((c) => c.status === 'answered').length;
    const answeredRate = totalCalls > 0 ? Math.round((answeredCalls / totalCalls) * 100) : 0;
    const missedCalls = calls.filter((c) => c.status === 'missed').length;
    const avgDuration = calls.length > 0
      ? calls.reduce((sum, c) => sum + c.duration_seconds, 0) / calls.length
      : 0;
    const qualifiedLeads = calls.filter((c) => 
      ['Interested', 'Follow-up required', 'Converted lead'].includes(c.outcome)
    ).length;

    return {
      totalCalls,
      answeredRate,
      missedCalls,
      avgCallDuration: formatDuration(Math.round(avgDuration)),
      qualifiedLeads,
      responseTime: "< 2s"
    };
  }, [calls]);

  // Transform chart data for hourly display
  const callsOverTimeData = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      // Return empty data structure
      return Array.from({ length: 10 }, (_, i) => ({ time: `${8 + i}:00`, calls: 0 }));
    }
    
    // Group by hour if we have detailed data, otherwise use chartData as-is
    return chartData.slice(-10).map((point, index) => ({
      time: new Date(point.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      calls: point.value
    }));
  }, [chartData]);

  // Transform outcome data with colors
  const outcomeChartData = useMemo(() => {
    if (!outcomeData || outcomeData.length === 0) return [];
    
    const colors = ['#00C853', '#666666', '#999999', '#5233FF', '#FFA500', '#FF5252'];
    return outcomeData.map((item, index) => ({
      name: item.name,
      value: item.value,
      color: colors[index % colors.length]
    }));
  }, [outcomeData]);

  // Calculate duration distribution
  const durationData = useMemo(() => {
    const buckets = {
      '0-1 min': 0,
      '1-2 min': 0,
      '2-3 min': 0,
      '3-5 min': 0,
      '5+ min': 0
    };

    calls.forEach(call => {
      const minutes = call.duration_seconds / 60;
      if (minutes < 1) buckets['0-1 min']++;
      else if (minutes < 2) buckets['1-2 min']++;
      else if (minutes < 3) buckets['2-3 min']++;
      else if (minutes < 5) buckets['3-5 min']++;
      else buckets['5+ min']++;
    });

    return Object.entries(buckets).map(([duration, count]) => ({ duration, count }));
  }, [calls]);

  // Business Impact Data from real stats
  const businessImpact = useMemo(() => {
    const missedCallsBefore = stats?.missed_calls || 0;
    const potentialLeadsLost = Math.round(missedCallsBefore * 0.33);
    const estimatedRevenueLoss = potentialLeadsLost * 3000;
    const capturedLeads = calls.filter((c) => c.status === 'answered').length;
    const hoursSaved = stats?.hours_saved || 0;
    const costSavings = stats?.estimated_savings_daily ? stats.estimated_savings_daily * 30 : 0;
    const captureRate = calls.length > 0 ? Math.round((calls.filter(c => c.status === 'answered').length / calls.length) * 100) : 0;
    const aiHandledPercentage = captureRate;
    const fteEquivalent = stats?.fte_saved || 0;
    const productivityBoost = stats?.productivity_boost || 0;

    return {
      missedCallsBefore,
      potentialLeadsLost,
      estimatedRevenueLoss,
      capturedLeads,
      hoursSaved,
      costSavings,
      captureRate,
      aiHandledPercentage,
      fteEquivalent,
      productivityBoost
    };
  }, [stats, calls]);

  // Lead Data from real calls
  const leads = useMemo(() => {
    return calls
      .filter(c => c.outcome && c.outcome !== 'Wrong Number' && c.outcome !== 'Not Interested')
      .slice(0, 10)
      .map((call, index) => ({
        id: call.id || `lead-${index}`,
        caller: call.phone,
        date: new Date(call.timestamp).toLocaleString('en-ZA', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: (call.status === 'answered' ? 'Complete' : call.status === 'missed' ? 'On Hold' : 'In Progress') as 'Complete' | 'In Progress' | 'On Hold',
        outcome: call.outcome || 'Unknown',
        estimatedValue: call.estimated_value || 0,
        followUpRequired: ['Follow-up required', 'Interested'].includes(call.outcome || '')
      }));
  }, [calls]);

  // Insights Data from real data
  const insights = useMemo(() => {
    const insightsList = [];
    
    if (businessImpact.hoursSaved > 0) {
      insightsList.push({
        type: 'insight' as const,
        title: '📊 Time Savings Achievement',
        message: `Your AI agent saved ${businessImpact.hoursSaved.toFixed(1)} hours this month—equal to hiring ${(businessImpact.hoursSaved / 160).toFixed(1)} part-time receptionist${(businessImpact.hoursSaved / 160) > 1 ? 's' : ''}. Your team can now focus on high-value client interactions.`,
        action: 'View detailed breakdown'
      });
    }

    if (kpiData.answeredRate < 90) {
      insightsList.push({
        type: 'alert' as const,
        title: '⚠️ Answer Rate Below Target',
        message: `Your answer rate is ${kpiData.answeredRate}%. Consider optimizing call routing during peak hours.`,
        action: 'Enable automated follow-up sequencing'
      });
    } else if (kpiData.answeredRate >= 95) {
      insightsList.push({
        type: 'insight' as const,
        title: '🎯 Excellent Answer Rate',
        message: `Your answer rate of ${kpiData.answeredRate}% exceeds the 95% target. Great performance!`,
        action: 'View detailed breakdown'
      });
    }

    if (businessImpact.missedCallsBefore > 0) {
      insightsList.push({
        type: 'recommendation' as const,
        title: '💡 After-Hours Opportunity',
        message: `You have ${businessImpact.missedCallsBefore} missed calls. Consider enabling 24/7 scheduling feature to capture these leads.`,
        action: 'Upgrade to 24/7 coverage'
      });
    }

    return insightsList;
  }, [businessImpact, kpiData]);

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
              <KpiCard
                title="Calls Handled"
                label="Calls Handled"
                value={kpiData.totalCalls}
                icon={Phone}
              />
              <KpiCard
                title="Answered Rate"
                label="Answered Rate"
                value={kpiData.answeredRate}
                suffix="%"
                icon={Target}
              />
              <KpiCard
                title="Missed Calls"
                label="Missed Calls"
                value={kpiData.missedCalls}
                icon={AlertCircle}
              />
              <KpiCard
                title="Avg Call Duration"
                label="Avg Call Duration"
                value={kpiData.avgCallDuration}
                icon={Clock}
              />
              <KpiCard
                title="Qualified Leads"
                label="Qualified Leads"
                value={kpiData.qualifiedLeads}
                icon={Users}
              />
              <KpiCard
                title="Response Time"
                label="Response Time"
                value={kpiData.responseTime}
                icon={CalendarIcon}
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
                  {outcomeLoading ? (
                    <div className="flex items-center justify-center h-[250px]">
                      <p className="text-[#B0B0B0]">Loading outcome data...</p>
                    </div>
                  ) : (
                    <PieChart>
                      <Pie
                        data={outcomeChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {outcomeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
                      />
                    </PieChart>
                  )}
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