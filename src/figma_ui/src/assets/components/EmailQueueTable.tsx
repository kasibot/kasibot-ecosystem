import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

interface Email {
  id: string;
  sender: string;
  subject: string;
  category: 'Sales' | 'Support' | 'Accounts' | 'Urgent' | 'Supplier' | 'Spam';
  actionStatus: 'Not Started' | 'In Progress' | 'In Review' | 'Complete' | 'Live' | 'On Hold';
  priority: 'low' | 'normal' | 'high';
  followUpRequired: boolean;
  timestamp: string;
}

interface EmailQueueTableProps {
  emails: Email[];
  crmConnected?: boolean;
}

export function EmailQueueTable({ emails, crmConnected = false }: EmailQueueTableProps) {
  const [filter, setFilter] = useState<'all' | 'priority' | 'awaiting' | 'autohandled' | 'new' | 'category'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Emails', icon: '📋' },
    { id: 'priority', label: 'Priority', icon: '🔥' },
    { id: 'awaiting', label: 'Awaiting Action', icon: '⏳' },
    { id: 'autohandled', label: 'Auto-Handled', icon: '🤖' },
    { id: 'new', label: 'New Today', icon: '✉' },
    { id: 'category', label: 'By Category', icon: '📁' }
  ];

  const categories = ['all', 'Sales', 'Support', 'Accounts', 'Urgent', 'Supplier', 'Spam'];

  const filteredEmails = emails.filter(email => {
    if (filter === 'all') return true;
    if (filter === 'priority') return email.priority === 'high';
    if (filter === 'awaiting') return email.actionStatus === 'In Progress';
    if (filter === 'autohandled') return email.actionStatus === 'Complete';
    if (filter === 'new') return email.timestamp.includes('Today');
    if (filter === 'category') {
      if (categoryFilter === 'all') return true;
      return email.category === categoryFilter;
    }
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-[#FF5252]';
      case 'normal': return 'text-[#5233FF]';
      case 'low': return 'text-[#666666]';
      default: return 'text-[#B0B0B0]';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'normal': return '🔵';
      case 'low': return '⚪';
      default: return '⚪';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sales': return 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/30';
      case 'Support': return 'bg-[#5233FF]/10 text-[#5233FF] border-[#5233FF]/30';
      case 'Accounts': return 'bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]/30';
      case 'Urgent': return 'bg-[#FF5252]/10 text-[#FF5252] border-[#FF5252]/30';
      case 'Supplier': return 'bg-[#9C27B0]/10 text-[#9C27B0] border-[#9C27B0]/30';
      case 'Spam': return 'bg-[#666666]/10 text-[#666666] border-[#666666]/30';
      default: return 'bg-[#333333]/10 text-[#B0B0B0] border-[#333333]/30';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#FFFFFF] text-xl">📬 Email Categorization & Queue Status</h2>
        {!crmConnected && (
          <button className="px-4 py-2 bg-[#5233FF]/20 text-[#5233FF] rounded-xl border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all text-sm">
            🔒 Unlock CRM Sync
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => {
              setFilter(f.id as any);
              if (f.id !== 'category') setCategoryFilter('all');
            }}
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

      {/* Category Sub-Filter */}
      {filter === 'category' && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg border text-xs transition-all ${
                categoryFilter === cat
                  ? 'bg-[#5233FF]/20 border-[#5233FF]/50 text-[#5233FF]'
                  : 'bg-[#1A1A1A] border-[#333333] text-[#B0B0B0] hover:border-[#5233FF]/30'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div 
        className="bg-[#222222] border border-[#333333] rounded-xl overflow-hidden"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1A1A1A] border-b border-[#333333]">
              <tr>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Sender</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Subject</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Category</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Action Status</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Priority</th>
                <th className="text-left text-[#B0B0B0] text-sm p-4">Follow-Up</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.map((email) => (
                <tr key={email.id} className="border-b border-[#333333] hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="text-[#FFFFFF] p-4 text-sm">{email.sender}</td>
                  <td className="text-[#B0B0B0] p-4 text-sm max-w-xs truncate">{email.subject}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg border text-xs ${getCategoryColor(email.category)}`}>
                      {email.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={email.actionStatus} />
                  </td>
                  <td className={`p-4 ${getPriorityColor(email.priority)}`}>
                    {getPriorityIcon(email.priority)} {email.priority.charAt(0).toUpperCase() + email.priority.slice(1)}
                  </td>
                  <td className="p-4">
                    {email.followUpRequired ? (
                      <span className="text-[#FFA500]">⏳ Yes</span>
                    ) : (
                      <span className="text-[#666666]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666]">No emails found matching this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
