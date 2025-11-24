import { TrendingDown, TrendingUp, Clock, Zap, Mail } from "lucide-react";

interface EmailBusinessImpactProps {
  emailsMissedBefore: number;
  hoursPreviouslySpent: number;
  operationalCostBefore: number;
  workloadReduced: number;
  hoursSaved: number;
  salarySavings: number;
  automationEfficiency: number;
  emailsFullyAutomated: number;
  semiAutomated: number;
  followUpTriggered: number;
}

export function EmailBusinessImpact({
  emailsMissedBefore,
  hoursPreviouslySpent,
  operationalCostBefore,
  workloadReduced,
  hoursSaved,
  salarySavings,
  automationEfficiency,
  emailsFullyAutomated,
  semiAutomated,
  followUpTriggered
}: EmailBusinessImpactProps) {
  return (
    <div>
      <h2 className="text-[#FFFFFF] text-xl mb-6">💼 Automation & Business Impact</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Before Automation */}
        <div 
          className="bg-[#222222] border border-[#FF5252]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(255, 82, 82, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-6 h-6 text-[#FF5252]" />
            <h3 className="text-[#FFFFFF] text-lg">Before Automation</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Avg Emails Missed or Delayed</p>
              <p className="text-[#FF5252] text-2xl">{emailsMissedBefore}</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Hours Previously Spent on Email</p>
              <p className="text-[#FF5252] text-2xl">{hoursPreviouslySpent} hrs/mo</p>
            </div>

            <div className="bg-gradient-to-br from-[#FF5252]/20 to-[#FF5252]/5 rounded-xl p-4 border border-[#FF5252]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">Estimated Operational Cost</p>
              <p className="text-[#FF5252] text-3xl">R{operationalCostBefore.toLocaleString()}</p>
              <p className="text-[#B0B0B0] text-xs mt-2">💀 Monthly cost before AI</p>
            </div>
          </div>
        </div>

        {/* After Kasibot */}
        <div 
          className="bg-[#222222] border border-[#00C853]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(0, 200, 83, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#00C853]" />
            <h3 className="text-[#FFFFFF] text-lg">After Kasibot Email Agent</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Human Workload Reduced</p>
              <p className="text-[#00C853] text-2xl">{workloadReduced}%</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Hours Saved This Month</p>
              <p className="text-[#00C853] text-2xl">{hoursSaved} hrs</p>
            </div>

            <div className="bg-gradient-to-br from-[#00C853]/20 to-[#00C853]/5 rounded-xl p-4 border border-[#00C853]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">Equivalent Salary Savings</p>
              <p className="text-[#00C853] text-3xl">R{salarySavings.toLocaleString()}</p>
              <p className="text-[#B0B0B0] text-xs mt-2">Automation Efficiency: {automationEfficiency}%</p>
            </div>
          </div>
        </div>

        {/* Productivity & ROI */}
        <div 
          className="bg-[#222222] border border-[#5233FF]/30 rounded-xl p-6"
          style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#5233FF]" />
            <h3 className="text-[#FFFFFF] text-lg">Productivity & ROI</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-[#5233FF]" />
                <p className="text-[#B0B0B0] text-sm">Emails Fully Automated</p>
              </div>
              <p className="text-[#5233FF] text-2xl">{emailsFullyAutomated}%</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
              <p className="text-[#B0B0B0] text-sm mb-1">Semi-Automated (Human Approval)</p>
              <p className="text-[#5233FF] text-2xl">{semiAutomated}%</p>
            </div>

            <div className="bg-gradient-to-br from-[#5233FF]/20 to-[#5233FF]/5 rounded-xl p-4 border border-[#5233FF]/30">
              <p className="text-[#B0B0B0] text-sm mb-1">⚡ Follow-Up Sequences Triggered</p>
              <p className="text-[#5233FF] text-3xl">{followUpTriggered}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
