import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useUserMetadata } from '@/lib/clerk';
import { useCalls, useDailyStats, useChartData, useOutcomeData } from '@/hooks';
import { TimeFilter } from '@/types';
import KpiCard from '@/components/KpiCard';
import CallChart from '@/components/CallChart';
import OutcomeChart from '@/components/OutcomeChart';
import RecentCallsTable from '@/components/RecentCallsTable';
import { LiveCallActivity } from '@/components/LiveCallActivity';
import { BusinessImpactCalculator } from '@/components/BusinessImpactCalculator';
import { LeadTable } from '@/components/LeadTable';
import { InsightsPanel } from '@/components/InsightsPanel';
import {
  Phone,
  Clock,
  Timer,
  Target,
  AlertCircle,
  Users
} from 'lucide-react';
import { formatDuration } from '@/lib/utils';

export default function Dashboard() {
  const metadata = useUserMetadata();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [callFilter, setCallFilter] = useState('7days');

  const { calls, loading: callsLoading } = useCalls(metadata?.clientId, callFilter);
  const { stats } = useDailyStats(metadata?.clientId);
  const { data: chartData, loading: chartLoading } = useChartData(metadata?.clientId, timeFilter);
  const { data: outcomeData, loading: outcomeLoading } = useOutcomeData(metadata?.clientId);

  // Calculate KPIs from today's calls
  const todayCalls = useMemo(() => {
    return calls.filter((call) => {
      const callDate = new Date(call.timestamp);
      const today = new Date();
      return callDate.toDateString() === today.toDateString();
    });
  }, [calls]);

  const missedCallsToday = todayCalls.filter((c) => c.status === 'missed').length;
  const qualifiedLeadsToday = todayCalls.filter((c) =>
    ['Interested', 'Follow-up required', 'Converted lead'].includes(c.outcome)
  ).length;

  // Calculate total stats from all calls
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

  // Format average duration
  const avgDurationFormatted = formatDuration(Math.round(avgDuration));

  // Live call activity data (mock for now, can be enhanced with real-time data)
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

  // Business impact data
  const businessImpact = useMemo(() => {
    const missedCallsBefore = stats?.missed_calls || 0;
    const potentialLeadsLost = Math.round(missedCallsBefore * 0.33); // Estimate 33% conversion
    const estimatedRevenueLoss = potentialLeadsLost * 3000; // Estimate R3000 per lead
    const capturedLeads = qualifiedLeads;
    const hoursSaved = stats?.hours_saved || 0;
    const costSavings = stats?.estimated_savings_daily ? stats.estimated_savings_daily * 30 : 0;
    const captureRate = totalCalls > 0 ? Math.round((answeredCalls / totalCalls) * 100) : 0;
    const aiHandledPercentage = 89; // Can be calculated from actual data
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
  }, [stats, qualifiedLeads, totalCalls, answeredCalls]);

  // Lead data from calls
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

  // Insights data
  const insights = useMemo(() => {
    const insightsList = [];

    if (missedCallsToday > 0) {
      insightsList.push({
        type: 'alert' as const,
        title: '⚠️ Missed Calls Today',
        message: `You have ${missedCallsToday} missed call${missedCallsToday > 1 ? 's' : ''} today. Consider enabling 24/7 coverage to capture these leads.`,
        action: 'Upgrade to 24/7 coverage'
      });
    }

    if (qualifiedLeadsToday > 0) {
      insightsList.push({
        type: 'insight' as const,
        title: '📊 Qualified Leads Achievement',
        message: `Your AI agent captured ${qualifiedLeadsToday} qualified lead${qualifiedLeadsToday > 1 ? 's' : ''} today. Great performance!`,
        action: 'View detailed breakdown'
      });
    }

    if (stats?.hours_saved) {
      insightsList.push({
        type: 'insight' as const,
        title: '⏰ Time Savings Achievement',
        message: `Your AI agent saved ${stats.hours_saved.toFixed(1)} hours this month—equal to hiring ${(stats.hours_saved / 160).toFixed(1)} part-time receptionist${(stats.hours_saved / 160) > 1 ? 's' : ''}.`,
        action: 'View detailed breakdown'
      });
    }

    if (answeredRate < 90) {
      insightsList.push({
        type: 'recommendation' as const,
        title: '💡 Answer Rate Optimization',
        message: `Your answer rate is ${answeredRate}%. Consider optimizing call routing during peak hours.`,
        action: 'Enable automated follow-up sequencing'
      });
    }

    return insightsList;
  }, [missedCallsToday, qualifiedLeadsToday, stats, answeredRate]);

  // Transform outcome data for pie chart with Figma colors
  const outcomeChartData = useMemo(() => {
    if (!outcomeData || outcomeData.length === 0) return [];

    const colors = ['#00C853', '#666666', '#999999', '#5233FF', '#FFA500', '#FF5252'];
    return outcomeData.map((item, index) => ({
      name: item.name,
      value: item.value,
      color: colors[index % colors.length]
    }));
  }, [outcomeData]);

  if (!metadata?.clientId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

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
          {/* Header */}
          <motion.div
            className="bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-8 shadow-[0_0_40px_rgba(82,51,255,0.2)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5233FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)' }}
              >
                <Phone className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h1
                className="text-[#FFFFFF]"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Voice Agent Dashboard
              </h1>
            </div>
            <p
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              Real-time AI receptionist analytics
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
                value={totalCalls}
                icon={Phone}
              />
              <KpiCard
                title="Answered Rate"
                label="Answered Rate"
                value={answeredRate}
                suffix="%"
                icon={Target}
              />
              <KpiCard
                title="Missed Calls"
                label="Missed Calls"
                value={missedCalls}
                icon={AlertCircle}
              />
              <KpiCard
                title="Avg Call Duration"
                label="Avg Call Duration"
                value={avgDurationFormatted}
                icon={Clock}
              />
              <KpiCard
                title="Qualified Leads"
                label="Qualified Leads"
                value={qualifiedLeads}
                icon={Users}
              />
              <KpiCard
                title="Response Time"
                label="Response Time"
                value="< 2s"
                subtitle="AI agent"
                icon={Timer}
              />
            </div>
          </div>

          {/* 3. Performance Trends */}
          <div>
            <h2 className="text-[#FFFFFF] text-xl mb-6">📊 Performance Trends</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Calls Over Time - Styled for dark theme */}
              {chartLoading ? (
                <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 flex items-center justify-center h-64">
                  <p className="text-[#B0B0B0]">Loading chart data...</p>
                </div>
              ) : (
                <div
                  className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#FFFFFF]">Calls Over Time</h3>
                    <div className="flex space-x-2">
                      {(['day', 'week', 'month', 'year'] as TimeFilter[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setTimeFilter(f)}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${timeFilter === f
                            ? 'bg-[#5233FF] text-white'
                            : 'bg-[#1A1A1A] text-[#B0B0B0] hover:bg-[#2A2A2A]'
                            }`}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <CallChart data={chartData} filter={timeFilter} onFilterChange={setTimeFilter} />
                </div>
              )}

              {/* Outcome Breakdown - Styled for dark theme */}
              {outcomeLoading ? (
                <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 flex items-center justify-center h-64">
                  <p className="text-[#B0B0B0]">Loading outcome data...</p>
                </div>
              ) : (
                <div
                  className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <h3 className="text-[#FFFFFF] mb-4">Outcome Breakdown</h3>
                  <OutcomeChart data={outcomeChartData} />
                </div>
              )}
            </div>
          </div>

          {/* 4. Business Impact */}
          <BusinessImpactCalculator {...businessImpact} />

          {/* 5. Lead Intelligence */}
          {leads.length > 0 && <LeadTable leads={leads} crmConnected={false} />}

          {/* 6. Recent Calls Table - Styled for dark theme */}
          {callsLoading ? (
            <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 flex items-center justify-center h-64">
              <p className="text-[#B0B0B0]">Loading calls...</p>
            </div>
          ) : (
            <div
              className="bg-[#222222] border border-[#333333] rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <RecentCallsTable
                calls={calls}
                onFilterChange={setCallFilter}
                currentFilter={callFilter}
              />
            </div>
          )}

          {/* 7. Insights & Recommendations */}
          {insights.length > 0 && <InsightsPanel insights={insights} />}
        </div>
      </div>
    </div>
  );
}
