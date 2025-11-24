import { formatCurrency } from '@/lib/utils';
import { TrendingUp, DollarSign } from 'lucide-react';

interface SavingsPanelProps {
  daily: number;
  monthly: number;
  yearly: number;
}

export default function SavingsPanel({ daily, monthly, yearly }: SavingsPanelProps) {
  return (
    <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Saved With Kasibot</h3>
        <TrendingUp className="w-6 h-6 text-green-600" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Daily</span>
          </div>
          <span className="text-lg font-bold text-green-600">{formatCurrency(daily)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Monthly</span>
          </div>
          <span className="text-lg font-bold text-green-600">{formatCurrency(monthly)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Yearly</span>
          </div>
          <span className="text-lg font-bold text-green-600">{formatCurrency(yearly)}</span>
        </div>
      </div>
    </div>
  );
}

