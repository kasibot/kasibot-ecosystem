import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Client, Call, DailyStats } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Building2, Users, Phone, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [clientStats, setClientStats] = useState<DailyStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setClients(data || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Fetch client stats when selected
  useEffect(() => {
    if (!selectedClient) {
      setClientStats(null);
      setRecentCalls([]);
      return;
    }

    const fetchClientData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch daily stats
        const { data: stats, error: statsError } = await supabase
          .from('daily_stats')
          .select('*')
          .eq('client_id', selectedClient)
          .eq('date', today)
          .single();

        if (statsError && statsError.code !== 'PGRST116') {
          throw statsError;
        }

        setClientStats(stats || null);

        // Fetch recent calls
        const { data: calls, error: callsError } = await supabase
          .from('calls')
          .select('*')
          .eq('client_id', selectedClient)
          .order('timestamp', { ascending: false })
          .limit(10);

        if (callsError) throw callsError;
        setRecentCalls(calls || []);
      } catch (err) {
        console.error('Error fetching client data:', err);
      }
    };

    fetchClientData();
  }, [selectedClient]);

  const handleRefreshStats = async () => {
    if (!selectedClient) return;

    // In a real app, this would trigger a recalculation in n8n
    alert('Stats refresh triggered. This would normally call n8n to recalculate daily stats.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all client accounts
        </p>
      </div>

      {/* Client Selector */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Client
        </label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">-- Select a client --</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.business_name || client.email}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center h-64">
          <p className="text-gray-500">Loading clients...</p>
        </div>
      ) : selectedClient ? (
        <>
          {/* Client Stats */}
          {clientStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{clientStats.total_calls}</p>
                  </div>
                  <Phone className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Answered</p>
                    <p className="text-2xl font-bold text-green-600">{clientStats.answered_calls}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Missed</p>
                    <p className="text-2xl font-bold text-red-600">{clientStats.missed_calls}</p>
                  </div>
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Daily Savings</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(clientStats.estimated_savings_daily)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleRefreshStats}
                className="btn-primary"
              >
                Refresh Daily Stats
              </button>
              <button className="btn-secondary">
                Export Call Logs
              </button>
              <button className="btn-secondary">
                Export Leads
              </button>
            </div>
          </div>

          {/* Recent Calls */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Outcome
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentCalls.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No calls found
                      </td>
                    </tr>
                  ) : (
                    recentCalls.map((call) => (
                      <tr key={call.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(call.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {call.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {call.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {call.outcome || 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a client to view their dashboard</p>
          </div>
        </div>
      )}
    </div>
  );
}

