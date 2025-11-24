import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

interface Insight {
  type: 'recommendation' | 'insight' | 'alert';
  title: string;
  message: string;
  action?: string;
}

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return <Lightbulb className="w-6 h-6 text-[#5233FF]" />;
      case 'insight':
        return <TrendingUp className="w-6 h-6 text-[#00C853]" />;
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-[#FFA500]" />;
      default:
        return <Lightbulb className="w-6 h-6" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'border-[#5233FF]/30';
      case 'insight':
        return 'border-[#00C853]/30';
      case 'alert':
        return 'border-[#FFA500]/30';
      default:
        return 'border-[#333333]';
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'from-[#5233FF]/10 to-[#5233FF]/5';
      case 'insight':
        return 'from-[#00C853]/10 to-[#00C853]/5';
      case 'alert':
        return 'from-[#FFA500]/10 to-[#FFA500]/5';
      default:
        return 'from-[#222222] to-[#222222]';
    }
  };

  return (
    <div>
      <h2 className="text-[#FFFFFF] text-xl mb-6">✨ Insights & Recommendations</h2>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${getBackgroundColor(insight.type)} border ${getBorderColor(insight.type)} rounded-xl p-6`}
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-[#FFFFFF] mb-2">{insight.title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed mb-3">
                  {insight.message}
                </p>
                {insight.action && (
                  <button className="text-[#5233FF] text-sm hover:text-[#7B61FF] transition-colors">
                    {insight.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
