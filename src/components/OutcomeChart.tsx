import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OutcomeData {
  name: string;
  value: number;
}

interface OutcomeChartProps {
  data: OutcomeData[];
}

export default function OutcomeChart({ data }: OutcomeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={(entry as any).color || '#5233FF'} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '8px' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

