import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

interface Lead {
  id: string;
  caller: string;
  date: string;
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Complete' | 'Live' | 'On Hold';
  outcome: string;
  estimatedValue: number;
  followUpRequired: boolean;
}

interface LeadTableProps {
  leads: Lead[];
  crmConnected?: boolean;
}

export function LeadTable({ leads, crmConnected = false }: LeadTableProps) {
  const [filter, setFilter] = useState<'all' | 'hot' | 'followup' | 'missed' | 'new'>('all');

  const filters = [
    { id: 'all', label: 'All Leads', icon: '📋' },
    { id: 'hot', label: 'Hot Leads', icon: '🔥' },
    { id: 'followup', label: 'Requires Follow-Up', icon: '⏳' },
    { id: 'missed', label: 'Missed Calls', icon: '❌' },
    { id: 'new', label: 'New Leads', icon: '📥' }
  ];

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    if (filter === 'hot') return lead.estimatedValue > 5000 || lead.outcome === 'Interested';
    if (filter === 'followup') return lead.followUpRequired || lead.outcome === 'Follow-up required';
    if (filter === 'missed') return lead.outcome === 'Missed' || lead.status === 'On Hold';
    if (filter === 'new') return lead.status === 'In Progress' || lead.status === 'Not Started';
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#FFFFFF] text-xl">📊 Lead Intelligence</h2>
        {!crmConnected && (
          <button className="px-4 py-2 bg-[#5233FF]/20 text-[#5233FF] rounded-xl border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all text-sm">
            🔒 Unlock CRM Sync
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-4 py-2 rounded-xl border transition-all text-sm ${
              filter === f.id
                ? 'bg-[#5233FF]/20 border-[#5233FF]/50 text-[#5233FF]'
                : 'bg-[#222222] border-[#333333] text-[#B0B0B0] hover:border-[#5233FF]/30'
            }`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div 
        className="bg-[#222222] border border-[#333333] rounded-xl overflow-hidden"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1A1A1A] border-b border-[#333333]">
              <tr>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Caller</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Date</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Status</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Outcome</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Estimated Value</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Follow-Up</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#333333] hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="text-[#FFFFFF] p-4">{lead.caller}</td>
                  <td className="text-[#B0B0B0] p-4 text-sm">{lead.date}</td>
                  <td className="p-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="text-[#B0B0B0] p-4">{lead.outcome}</td>
                  <td className="text-[#5233FF] p-4">
                    {lead.estimatedValue > 0 ? `R${lead.estimatedValue.toLocaleString()}` : 'Unknown'}
                  </td>
                  <td className="p-4">
                    {lead.followUpRequired ? (
                      <span className="text-[#FFA500]">🔁 Yes</span>
                    ) : (
                      <span className="text-[#666666]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666]">No leads found matching this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
