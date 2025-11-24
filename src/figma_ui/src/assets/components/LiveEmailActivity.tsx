import { motion } from "motion/react";
import { Mail, Send, Clock, AlertTriangle, CheckCircle, Archive } from "lucide-react";

interface EmailEvent {
  type: 'received' | 'auto-replied' | 'urgent' | 'followup';
  from?: string;
  category?: string;
  timestamp: string;
  message: string;
}

interface LiveEmailActivityProps {
  receivedToday: number;
  autoRepliesSent: number;
  awaitingAction: number;
  priorityFlagged: number;
  recentEvents: EmailEvent[];
}

export function LiveEmailActivity({ 
  receivedToday, 
  autoRepliesSent, 
  awaitingAction,
  priorityFlagged,
  recentEvents 
}: LiveEmailActivityProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'received': return <Mail className="w-4 h-4 text-[#5233FF]" />;
      case 'auto-replied': return <CheckCircle className="w-4 h-4 text-[#00C853]" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-[#FFA500]" />;
      case 'followup': return <Send className="w-4 h-4 text-[#5233FF]" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-[#5233FF]/10 to-[#7B61FF]/5 border border-[#5233FF]/30 rounded-xl p-6"
      style={{ boxShadow: '0 0 40px rgba(82, 51, 255, 0.2)' }}
    >
      <h2 className="text-[#FFFFFF] text-xl mb-6">📧 Live Email Activity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-[#5233FF]" />
            <p className="text-[#B0B0B0] text-sm">Received Today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#5233FF] animate-pulse" 
              style={{ boxShadow: '0 0 10px rgba(82, 51, 255, 0.5)' }} 
            />
            <p className="text-[#FFFFFF] text-3xl">{receivedToday}</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-5 h-5 text-[#00C853]" />
            <p className="text-[#B0B0B0] text-sm">Auto-Replies Sent</p>
          </div>
          <p className="text-[#00C853] text-3xl">{autoRepliesSent}</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#FFA500]" />
            <p className="text-[#B0B0B0] text-sm">Awaiting Action</p>
          </div>
          <p className="text-[#FFA500] text-3xl">{awaitingAction}</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#FF5252]" />
            <p className="text-[#B0B0B0] text-sm">Priority Flagged</p>
          </div>
          <p className="text-[#FF5252] text-3xl">{priorityFlagged}</p>
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
                <p className="text-[#B0B0B0]">{event.message}</p>
                <p className="text-[#666666] text-xs">{event.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
