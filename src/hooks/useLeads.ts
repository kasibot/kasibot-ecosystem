import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lead } from '@/types';

export function useLeads(clientId: string | undefined, filters?: { outcome?: string; status?: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    const fetchLeads = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('calls')
          .select('id, client_id, phone, outcome, estimated_value, timestamp')
          .eq('client_id', clientId)
          .in('outcome', ['Interested', 'Follow-up required', 'Converted lead'])
          .order('timestamp', { ascending: false });

        if (filters?.outcome) {
          query = query.eq('outcome', filters.outcome);
        }

        const { data, error: fetchError } = await query.limit(100);

        if (fetchError) throw fetchError;

        // Transform calls to leads format
        const leadsData: Lead[] = (data || []).map((call) => ({
          id: call.id,
          client_id: call.client_id,
          phone: call.phone,
          outcome: call.outcome,
          estimated_value: call.estimated_value || 0,
          status: call.outcome === 'Converted lead' ? 'converted' : 
                  call.outcome === 'Interested' ? 'hot' : 'follow-up',
          created_at: call.timestamp,
        }));

        if (filters?.status) {
          const filtered = leadsData.filter((lead) => lead.status === filters.status);
          setLeads(filtered);
        } else {
          setLeads(leadsData);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leads');
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [clientId, filters?.outcome, filters?.status]);

  return { leads, loading, error };
}

