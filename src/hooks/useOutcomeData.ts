import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface OutcomeData {
  name: string;
  value: number;
}

export function useOutcomeData(clientId: string | undefined) {
  const [data, setData] = useState<OutcomeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { data: calls, error: fetchError } = await supabase
          .from('calls')
          .select('outcome')
          .eq('client_id', clientId)
          .gte('timestamp', today.toISOString());

        if (fetchError) throw fetchError;

        // Group by outcome
        const grouped = new Map<string, number>();
        calls?.forEach((call) => {
          const outcome = call.outcome || 'Unknown';
          grouped.set(outcome, (grouped.get(outcome) || 0) + 1);
        });

        // Convert to chart format
        const outcomeData: OutcomeData[] = Array.from(grouped.entries()).map(([name, value]) => ({
          name,
          value,
        }));

        setData(outcomeData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch outcome data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  return { data, loading, error };
}

