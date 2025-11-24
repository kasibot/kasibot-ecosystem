import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useUserMetadata } from '@/lib/clerk';
import { useDailyStats, useCalls } from '@/hooks';
import { BusinessImpactCalculator } from '@/components/BusinessImpactCalculator';
import { InsightsPanel } from '@/components/InsightsPanel';
import { formatCurrency, calculateFTE } from '@/lib/utils';
import { 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

export default function Insights() {
  const metadata = useUserMetadata();
  const { stats, loading: statsLoading } = useDailyStats(metadata?.clientId);
  const { calls } = useCalls(metadata?.clientId, '30days');

  if (!metadata?.clientId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Calculate business impact metrics
  const dailyLoss = stats?.estimated_loss_daily || 0;
  const monthlyLoss = dailyLoss * 30;
  const yearlyLoss = dailyLoss * 365;

  const dailySavings = stats?.estimated_savings_daily || 0;
  const monthlySavings = dailySavings * 30;
  const yearlySavings = dailySavings * 365;

  const hoursSaved = stats?.hours_saved || 0;
  const weeklyHours = hoursSaved * 7;
  const monthlyHours = hoursSaved * 30;
  const yearlyHours = hoursSaved * 365;
  const productivityBoost = stats?.productivity_boost || 0;
  const fteSaved = stats?.fte_saved || calculateFTE(monthlyHours);

  // Calculate AI capture rate
  const totalCalls = calls.length;
  const answeredCalls = calls.filter((c) => c.status === 'answered').length;
  const missedCalls = calls.filter((c) => c.status === 'missed').length;
  const captureRate = totalCalls > 0 ? (answeredCalls / totalCalls) * 100 : 0;

  // Calculate potential leads lost (estimate 33% conversion rate)
  const potentialLeadsLost = Math.round(missedCalls * 0.33);
  const estimatedRevenueLoss = potentialLeadsLost * 3000; // R3000 per lead estimate

  // Business impact data for BusinessImpactCalculator
  const businessImpact = useMemo(() => {
    return {
      missedCallsBefore: missedCalls,
      potentialLeadsLost,
      estimatedRevenueLoss,
      capturedLeads: answeredCalls,
      hoursSaved: monthlyHours,
      costSavings: monthlySavings,
      captureRate: Math.round(captureRate),
      aiHandledPercentage: Math.round(captureRate),
      fteEquivalent: fteSaved,
      productivityBoost: Math.round(productivityBoost)
    };
  }, [missedCalls, potentialLeadsLost, estimatedRevenueLoss, answeredCalls, monthlyHours, monthlySavings, captureRate, fteSaved, productivityBoost]);

  // Generate insights
  const insights = useMemo(() => {
    const insightsList = [];

    if (monthlySavings > 0) {
      insightsList.push({
        type: 'insight' as const,
        title: '💰 Monthly Savings Achievement',
        message: `You saved ${monthlyHours.toFixed(1)} hours and ${formatCurrency(monthlySavings)} this month — equivalent to ${fteSaved.toFixed(2)} FTE. Your team can now focus on high-value client interactions.`,
        action: 'View detailed breakdown'
      });
    }

    if (captureRate >= 95) {
      insightsList.push({
        type: 'insight' as const,
        title: '🎯 Excellent AI Capture Rate',
        message: `Your AI agent is capturing ${captureRate.toFixed(1)}% of calls, exceeding the 95% target. This is exceptional performance!`,
        action: 'View call analytics'
      });
    } else if (captureRate < 90) {
      insightsList.push({
        type: 'alert' as const,
        title: '⚠️ AI Capture Rate Below Target',
        message: `Your AI agent is capturing ${captureRate.toFixed(1)}% of calls. Consider reviewing call routing settings to improve this metric.`,
        action: 'Optimize call routing'
      });
    }

    // Find busiest hours
    const hourCounts = new Map<number, number>();
    calls.forEach((call) => {
      const hour = new Date(call.timestamp).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });
    const busiestHour = Array.from(hourCounts.entries()).sort((a, b) => b[1] - a[1])[0];
    
    if (busiestHour && busiestHour[1] > 10) {
      insightsList.push({
        type: 'recommendation' as const,
        title: '⏰ Peak Hour Optimization',
        message: `Most calls occur at ${busiestHour[0]}:00, with ${busiestHour[1]} calls in the last 30 days. Consider optimizing resources during this peak period.`,
        action: 'View hourly breakdown'
      });
    }

    if (productivityBoost > 20) {
      insightsList.push({
        type: 'insight' as const,
        title: '📈 High Productivity Boost',
        message: `Your productivity boost of ${productivityBoost.toFixed(1)}% demonstrates significant efficiency gains from AI automation.`,
        action: 'View productivity metrics'
      });
    }

    if (yearlySavings > 0) {
      insightsList.push({
        type: 'insight' as const,
        title: '🚀 Annual Impact Projection',
        message: `Based on current performance, you're projected to save ${formatCurrency(yearlySavings)} annually with Kasibot automation.`,
        action: 'View ROI calculator'
      });
    }

    return insightsList;
  }, [monthlySavings, monthlyHours, fteSaved, captureRate, calls, productivityBoost, yearlySavings]);

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
                <Lightbulb className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h1 
                className="text-[#FFFFFF]" 
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Business Impact & Insights
              </h1>
            </div>
            <p 
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              Analytics and recommendations to optimize your AI receptionist performance
            </p>
          </motion.div>

          {statsLoading ? (
            <div className="bg-[#222222] border border-[#333333] rounded-xl p-12 flex items-center justify-center">
              <p className="text-[#B0B0B0]">Loading insights...</p>
            </div>
          ) : (
            <>
              {/* Business Impact Calculator */}
              <BusinessImpactCalculator {...businessImpact} />

              {/* AI Capture Rate */}
              <motion.div
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-[#5233FF]" />
                  <h3 className="text-[#FFFFFF] text-xl">🎯 AI Capture Rate</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#B0B0B0] text-sm">Current Rate</span>
                    <span className={`text-2xl font-bold ${
                      captureRate >= 95 ? 'text-[#00C853]' : 
                      captureRate >= 90 ? 'text-[#FFA500]' : 
                      'text-[#FF5252]'
                    }`}>
                      {captureRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#1A1A1A] rounded-full h-6 border border-[#333333]">
                    <motion.div
                      className={`h-6 rounded-full ${
                        captureRate >= 95 ? 'bg-[#00C853]' : 
                        captureRate >= 90 ? 'bg-[#FFA500]' : 
                        'bg-[#FF5252]'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(captureRate, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#666666]">Target: &gt;95%</p>
                    <p className="text-xs text-[#B0B0B0]">
                      {answeredCalls} answered / {totalCalls} total calls
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Key Metrics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  className="bg-[#222222] border border-[#FF5252]/30 rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="w-6 h-6 text-[#FF5252]" />
                    <h4 className="text-[#FFFFFF] text-sm">Monthly Loss (Before)</h4>
                  </div>
                  <p className="text-[#FF5252] text-2xl font-bold">
                    {formatCurrency(monthlyLoss)}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-[#222222] border border-[#00C853]/30 rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-[#00C853]" />
                    <h4 className="text-[#FFFFFF] text-sm">Monthly Savings</h4>
                  </div>
                  <p className="text-[#00C853] text-2xl font-bold">
                    {formatCurrency(monthlySavings)}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-[#222222] border border-[#5233FF]/30 rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#5233FF]" />
                    <h4 className="text-[#FFFFFF] text-sm">Hours Saved (Monthly)</h4>
                  </div>
                  <p className="text-[#5233FF] text-2xl font-bold">
                    {monthlyHours.toFixed(1)}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-[#222222] border border-[#FFA500]/30 rounded-xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-[#FFA500]" />
                    <h4 className="text-[#FFFFFF] text-sm">Productivity Boost</h4>
                  </div>
                  <p className="text-[#FFA500] text-2xl font-bold">
                    +{productivityBoost.toFixed(1)}%
                  </p>
                </motion.div>
              </div>

              {/* Time Saved Breakdown */}
              <motion.div
                className="bg-[#222222] border border-[#333333] rounded-xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-[#5233FF]" />
                  <h3 className="text-[#FFFFFF] text-xl">⏰ Time Saved Breakdown</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-xs mb-2">Daily</p>
                    <p className="text-[#FFFFFF] text-2xl font-bold">{hoursSaved.toFixed(1)} hrs</p>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-xs mb-2">Weekly</p>
                    <p className="text-[#FFFFFF] text-2xl font-bold">{weeklyHours.toFixed(1)} hrs</p>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-xs mb-2">Monthly</p>
                    <p className="text-[#FFFFFF] text-2xl font-bold">{monthlyHours.toFixed(1)} hrs</p>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                    <p className="text-[#B0B0B0] text-xs mb-2">Yearly</p>
                    <p className="text-[#FFFFFF] text-2xl font-bold">{yearlyHours.toFixed(1)} hrs</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#333333] grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#5233FF]" />
                      <span className="text-[#B0B0B0] text-sm">FTE Equivalents Saved</span>
                    </div>
                    <span className="text-[#5233FF] text-xl font-bold">{fteSaved.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B0B0] text-sm">Productivity Boost</span>
                    <span className="text-[#00C853] text-xl font-bold">{productivityBoost.toFixed(1)}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Insights & Recommendations */}
              {insights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <InsightsPanel insights={insights} />
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
