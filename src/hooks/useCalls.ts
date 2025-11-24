import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Call } from '@/types';
import { getDateRange } from '@/lib/utils';

export function useCalls(clientId: string | undefined, filter: string = '7days') {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    const fetchCalls = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('calls')
          .select('*')
          .eq('client_id', clientId)
          .order('timestamp', { ascending: false });

        // Apply date filter
        const now = new Date();
        let startDate: Date;

        switch (filter) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case '7days':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case '30days':
            startDate = new Date(now.setDate(now.getDate() - 30));
            break;
          default:
            startDate = new Date(now.setDate(now.getDate() - 7));
        }

        query = query.gte('timestamp', startDate.toISOString());

        const { data, error: fetchError } = await query.limit(100);

        if (fetchError) throw fetchError;
        setCalls(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch calls');
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();

    // Set up real-time subscription
    const channel = supabase
      .channel('calls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calls',
          filter: `client_id=eq.${clientId}`,
        },
        () => {
          fetchCalls();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, filter]);

  return { calls, loading, error };
}

