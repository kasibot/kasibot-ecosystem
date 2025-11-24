import { formatCurrency, calculateFTE } from '@/lib/utils';
import { Clock, Users } from 'lucide-react';

interface TimeSavedPanelProps {
  hoursSaved: number;
  weekly: number;
  monthly: number;
  yearly: number;
  productivityBoost: number;
}

export default function TimeSavedPanel({
  hoursSaved,
  weekly,
  monthly,
  yearly,
  productivityBoost,
}: TimeSavedPanelProps) {
  const fteSaved = calculateFTE(monthly);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Time Saved</h3>
        <Clock className="w-6 h-6 text-primary-600" />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Hours Saved (Daily)</p>
            <p className="text-xl font-bold text-gray-900">{hoursSaved.toFixed(1)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Weekly</p>
            <p className="text-xl font-bold text-gray-900">{weekly.toFixed(1)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Monthly</p>
            <p className="text-xl font-bold text-gray-900">{monthly.toFixed(1)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Yearly</p>
            <p className="text-xl font-bold text-gray-900">{yearly.toFixed(1)}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">FTE Equivalents Saved</span>
            </div>
            <span className="text-lg font-bold text-primary-600">{fteSaved.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Productivity Boost</span>
            <span className="text-lg font-bold text-green-600">{productivityBoost.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

