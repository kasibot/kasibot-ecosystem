import { motion } from "motion/react";
import { Phone, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface CallEvent {
  type: 'incoming' | 'completed' | 'missed' | 'transferred';
  phone: string;
  duration?: string;
  agent?: string;
  timestamp: string;
}

interface LiveCallActivityProps {
  activeCallsCount: number;
  longestCallDuration: string;
  agentType: string;
  recentEvents: CallEvent[];
}

export function LiveCallActivity({ 
  activeCallsCount, 
  longestCallDuration, 
  agentType,
  recentEvents 
}: LiveCallActivityProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'incoming': return <Phone className="w-4 h-4 text-[#5233FF]" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-[#00C853]" />;
      case 'missed': return <XCircle className="w-4 h-4 text-[#FF5252]" />;
      case 'transferred': return <ArrowRight className="w-4 h-4 text-[#FFA500]" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const getEventText = (event: CallEvent) => {
    switch (event.type) {
      case 'incoming':
        return `New inbound call from ${event.phone} — routing…`;
      case 'completed':
        return `Call completed (${event.duration}) — AI handled call successfully`;
      case 'missed':
        return `Missed — caller hung up before greeting`;
      case 'transferred':
        return `Transferred to ${event.agent}`;
      default:
        return '';
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-[#5233FF]/10 to-[#7B61FF]/5 border border-[#5233FF]/30 rounded-xl p-6"
      style={{ boxShadow: '0 0 40px rgba(82, 51, 255, 0.2)' }}
    >
      <h2 className="text-[#FFFFFF] text-xl mb-6">🔴 Live Call Activity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <p className="text-[#B0B0B0] text-sm mb-2">Active Calls</p>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00C853] animate-pulse" 
              style={{ boxShadow: '0 0 10px rgba(0, 200, 83, 0.5)' }} 
            />
            <p className="text-[#FFFFFF] text-3xl">{activeCallsCount}</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <p className="text-[#B0B0B0] text-sm mb-2">Longest Current Call</p>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#5233FF]" />
            <p className="text-[#FFFFFF] text-2xl">{longestCallDuration}</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <p className="text-[#B0B0B0] text-sm mb-2">Agent Handling</p>
          <p className="text-[#5233FF] text-xl">{agentType}</p>
        </div>
      </div>

      {/* Live Feed */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
        <p className="text-[#B0B0B0] text-sm mb-4">Live Feed</p>
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {recentEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-sm"
            >
              {getEventIcon(event.type)}
              <div className="flex-1">
                <p className="text-[#B0B0B0]">{getEventText(event)}</p>
                <p className="text-[#666666] text-xs">{event.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
