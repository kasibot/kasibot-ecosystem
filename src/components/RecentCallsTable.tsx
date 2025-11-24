import { Call } from '@/types';
import { formatDateTime, formatDuration, formatCurrency } from '@/lib/utils';
import { Phone, CheckCircle, XCircle, Clock } from 'lucide-react';

interface RecentCallsTableProps {
  calls: Call[];
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export default function RecentCallsTable({ calls, onFilterChange, currentFilter }: RecentCallsTableProps) {
  const filters = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 days', value: '7days' },
    { label: 'Last 30 days', value: '30days' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="w-5 h-5 text-[#00C853]" />;
      case 'missed':
        return <XCircle className="w-5 h-5 text-[#FF5252]" />;
      default:
        return <Clock className="w-5 h-5 text-[#666666]" />;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#FFFFFF]">Recent Calls</h3>
        <div className="flex space-x-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentFilter === f.value
                  ? 'bg-[#5233FF] text-white'
                  : 'bg-[#1A1A1A] text-[#B0B0B0] hover:bg-[#2A2A2A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#1A1A1A] border-b border-[#333333]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Caller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333333]">
            {calls.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-[#666666]">
                  No calls found
                </td>
              </tr>
            ) : (
              calls.map((call) => (
                <tr key={call.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFFFFF]">
                    {formatDateTime(call.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#666666]" />
                      <span className="text-sm text-[#FFFFFF]">{call.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(call.status)}
                      <span className="ml-2 text-sm text-[#FFFFFF] capitalize">{call.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B0B0B0]">
                    {formatDuration(call.duration_seconds)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFFFFF] capitalize">
                    {call.outcome || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5233FF]">
                    {call.estimated_value > 0 ? formatCurrency(call.estimated_value) : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

