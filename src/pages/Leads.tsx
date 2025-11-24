import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useUserMetadata } from '@/lib/clerk';
import { useLeads } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';
import { LeadTable } from '@/components/LeadTable';
import { Users, Filter, Download } from 'lucide-react';

export default function Leads() {
  const metadata = useUserMetadata();
  const [outcomeFilter, setOutcomeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { leads, loading } = useLeads(metadata?.clientId, {
    outcome: outcomeFilter || undefined,
    status: statusFilter || undefined,
  });

  // Transform leads data to match LeadTable interface
  const transformedLeads = useMemo(() => {
    return leads.map((lead) => ({
      id: lead.id || `lead-${lead.phone}`,
      caller: lead.phone,
      date: lead.created_at 
        ? formatDate(lead.created_at)
        : new Date().toLocaleString('en-ZA', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
      status: (() => {
        // Map status to LeadTable status type
        if (lead.status === 'converted') return 'Complete' as const;
        if (lead.status === 'hot') return 'In Progress' as const;
        if (lead.status === 'follow-up') return 'On Hold' as const;
        return 'In Progress' as const;
      })(),
      outcome: lead.outcome || 'Unknown',
      estimatedValue: lead.estimated_value || 0,
      followUpRequired: lead.outcome === 'Follow-up required' || lead.status === 'follow-up'
    }));
  }, [leads]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const hotLeads = leads.filter(l => l.status === 'hot').length;
    const followUpLeads = leads.filter(l => l.status === 'follow-up').length;
    const convertedLeads = leads.filter(l => l.status === 'converted').length;
    const totalValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);

    return {
      totalLeads,
      hotLeads,
      followUpLeads,
      convertedLeads,
      totalValue
    };
  }, [leads]);

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
                <Users className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h1 
                className="text-[#FFFFFF]" 
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
              >
                Lead Management
              </h1>
            </div>
            <p 
              className="text-[#B0B0B0] text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
            >
              Track and manage your qualified leads
            </p>
          </motion.div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-[#222222] border border-[#333333] rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[#B0B0B0] text-sm mb-2">Total Leads</p>
              <p className="text-[#FFFFFF] text-3xl">{stats.totalLeads}</p>
            </motion.div>

            <motion.div
              className="bg-[#222222] border border-[#FFA500]/30 rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#B0B0B0] text-sm mb-2">🔥 Hot Leads</p>
              <p className="text-[#FFA500] text-3xl">{stats.hotLeads}</p>
            </motion.div>

            <motion.div
              className="bg-[#222222] border border-[#5233FF]/30 rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#B0B0B0] text-sm mb-2">⏳ Follow-Up Required</p>
              <p className="text-[#5233FF] text-3xl">{stats.followUpLeads}</p>
            </motion.div>

            <motion.div
              className="bg-[#222222] border border-[#00C853]/30 rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[#B0B0B0] text-sm mb-2">✅ Converted</p>
              <p className="text-[#00C853] text-3xl">{stats.convertedLeads}</p>
            </motion.div>
          </div>

          {/* Total Value Card */}
          {stats.totalValue > 0 && (
            <motion.div
              className="bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-6"
              style={{ boxShadow: '0 0 40px rgba(82, 51, 255, 0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Total Estimated Value</p>
                  <p className="text-[#FFFFFF] text-4xl font-bold">
                    {formatCurrency(stats.totalValue)}
                  </p>
                </div>
                <div className="bg-[#5233FF] p-4 rounded-xl">
                  <Download className="w-8 h-8 text-[#FFFFFF]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced Filters */}
          <motion.div
            className="bg-[#222222] border border-[#333333] rounded-xl p-6"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-[#5233FF]" />
              <h3 className="text-[#FFFFFF] text-lg">Advanced Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-2">
                  Filter by Outcome
                </label>
                <select
                  value={outcomeFilter}
                  onChange={(e) => setOutcomeFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] text-[#FFFFFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5233FF] focus:border-[#5233FF]"
                >
                  <option value="">All Outcomes</option>
                  <option value="Interested">Interested</option>
                  <option value="Follow-up required">Follow-up Required</option>
                  <option value="Converted lead">Converted Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-2">
                  Filter by Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333333] text-[#FFFFFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5233FF] focus:border-[#5233FF]"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="hot">Hot</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Lead Table */}
          {loading ? (
            <div className="bg-[#222222] border border-[#333333] rounded-xl p-12 flex items-center justify-center">
              <p className="text-[#B0B0B0]">Loading leads...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <LeadTable leads={transformedLeads} crmConnected={false} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
