import { formatCurrency } from '@/lib/utils';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface CostOfMissedCallsPanelProps {
  daily: number;
  monthly: number;
  yearly: number;
}

export default function CostOfMissedCallsPanel({ daily, monthly, yearly }: CostOfMissedCallsPanelProps) {
  return (
    <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Cost of Missed Calls Before Kasibot</h3>
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Based on 62% industry-average missed call rate
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <span className="text-sm font-medium text-gray-700">Daily Loss</span>
          <span className="text-lg font-bold text-red-600">{formatCurrency(daily)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <span className="text-sm font-medium text-gray-700">Monthly Loss</span>
          <span className="text-lg font-bold text-red-600">{formatCurrency(monthly)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <span className="text-sm font-medium text-gray-700">Yearly Loss</span>
          <span className="text-lg font-bold text-red-600">{formatCurrency(yearly)}</span>
        </div>
      </div>
    </div>
  );
}

