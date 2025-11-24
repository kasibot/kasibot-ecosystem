import { Lightbulb } from 'lucide-react';

interface InsightsCardProps {
  title: string;
  content: string;
  type?: 'info' | 'success' | 'warning';
}

export default function InsightsCard({ title, content, type = 'info' }: InsightsCardProps) {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div className={`card ${bgColors[type]} border-2`}>
      <div className="flex items-start">
        <Lightbulb className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-sm text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
}

