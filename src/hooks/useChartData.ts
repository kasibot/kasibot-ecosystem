import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { ChartDataPoint, TimeFilter } from '@/types';
import { getDateRange } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

export function useChartData(clientId: string | undefined, filter: TimeFilter) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
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
        const { start, end } = getDateRange(filter);

        const { data: calls, error: fetchError } = await supabase
          .from('calls')
          .select('timestamp')
          .eq('client_id', clientId)
          .gte('timestamp', start.toISOString())
          .lte('timestamp', end.toISOString())
          .order('timestamp', { ascending: true });

        if (fetchError) throw fetchError;

        // Group by date
        const grouped = new Map<string, number>();
        calls?.forEach((call) => {
          const date = format(parseISO(call.timestamp), 'yyyy-MM-dd');
          grouped.set(date, (grouped.get(date) || 0) + 1);
        });

        // Convert to chart data format
        const chartData: ChartDataPoint[] = Array.from(grouped.entries()).map(([date, value]) => ({
          date,
          value,
        }));

        setData(chartData.sort((a, b) => a.date.localeCompare(b.date)));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId, filter]);

  return { data, loading, error };
}

