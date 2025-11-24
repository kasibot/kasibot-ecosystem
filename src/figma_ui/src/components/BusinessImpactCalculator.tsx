import { TrendingDown, TrendingUp, Clock, Zap } from "lucide-react";

interface BusinessImpactCalculatorProps {
  missedCallsBefore: number;
  potentialLeadsLost: number;
  estimatedRevenueLoss: number;
  capturedLeads: number;
  hoursSaved: number;
  costSavings: number;
  captureRate: number;
  aiHandledPercentage: number;
  fteEquivalent: number;
  productivityBoost: number;
}

export function BusinessImpactCalculator({
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
}: BusinessImpactCalculatorProps) {
  return (
    <div>
      <h2 className="text-[#FFFFFF] text-xl mb-6">💰 Business Impact</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Before Kasibot */}
        <div 
          className="bg-[#222222] border border-[#FF5252]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(255, 82, 82, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-6 h-6 text-[#FF5252]" />
            <h3 className="text-[#FFFFFF] text-lg">Missed Revenue (Before Kasibot)</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Missed Calls</p>
              <p className="text-[#FF5252] text-2xl">{missedCallsBefore}</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Potential Lost Leads</p>
              <p className="text-[#FF5252] text-2xl">{potentialLeadsLost}</p>
            </div>

            <div className="bg-gradient-to-br from-[#FF5252]/20 to-[#FF5252]/5 rounded-xl p-4 border border-[#FF5252]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">Estimated Revenue Loss</p>
              <p className="text-[#FF5252] text-3xl">R{estimatedRevenueLoss.toLocaleString()}</p>
              <p className="text-[#B0B0B0] text-xs mt-2">💀 Monthly Loss Before Automation</p>
            </div>
          </div>
        </div>

        {/* With Kasibot */}
        <div 
          className="bg-[#222222] border border-[#00C853]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(0, 200, 83, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#00C853]" />
            <h3 className="text-[#FFFFFF] text-lg">Savings With Automation</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Captured Leads</p>
              <p className="text-[#00C853] text-2xl">{capturedLeads}</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Hours Saved This Month</p>
              <p className="text-[#00C853] text-2xl">{hoursSaved} hrs</p>
            </div>

            <div className="bg-gradient-to-br from-[#00C853]/20 to-[#00C853]/5 rounded-xl p-4 border border-[#00C853]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">Estimated Cost Savings</p>
              <p className="text-[#00C853] text-3xl">R{costSavings.toLocaleString()}</p>
              <p className="text-[#B0B0B0] text-xs mt-2">Performance Capture Rate: {captureRate}%</p>
            </div>
          </div>
        </div>

        {/* Time & Productivity */}
        <div 
          className="bg-[#222222] border border-[#5233FF]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-[#5233FF]" />
            <h3 className="text-[#FFFFFF] text-lg">Time & Productivity Impact</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#5233FF]" />
                <p className="text-[#B0B0B0] text-sm">AI-Handled Calls</p>
              </div>
              <p className="text-[#5233FF] text-2xl">{aiHandledPercentage}%</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">💼 FTE Replacement Equivalent</p>
              <p className="text-[#5233FF] text-2xl">{fteEquivalent}</p>
              <p className="text-[#666666] text-xs mt-1">Full-time role equivalents</p>
            </div>

            <div className="bg-gradient-to-br from-[#5233FF]/20 to-[#5233FF]/5 rounded-xl p-4 border border-[#5233FF]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">🧠 Productivity Boost Estimate</p>
              <p className="text-[#5233FF] text-3xl">+{productivityBoost}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
