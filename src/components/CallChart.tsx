import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint, TimeFilter } from '@/types';
import { formatDate } from '@/lib/utils';

interface CallChartProps {
  data: ChartDataPoint[];
  filter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export default function CallChart({ data, filter, onFilterChange }: CallChartProps) {
  const filters: { label: string; value: TimeFilter }[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => formatDate(value)}
          stroke="#B0B0B0"
        />
        <YAxis stroke="#B0B0B0" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
          labelStyle={{ color: '#FFFFFF' }}
          labelFormatter={(value) => formatDate(value)}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#5233FF" 
          strokeWidth={2}
          dot={{ fill: '#5233FF' }}
          name="Calls"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

