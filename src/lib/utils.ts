import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';
import { TimeFilter } from '@/types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(value);
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const getDateRange = (filter: TimeFilter): { start: Date; end: Date } => {
  const end = new Date();
  let start: Date;

  switch (filter) {
    case 'day':
      start = startOfDay(end);
      break;
    case 'week':
      start = startOfDay(subDays(end, 7));
      break;
    case 'month':
      start = startOfDay(subMonths(end, 1));
      break;
    case 'year':
      start = startOfDay(subYears(end, 1));
      break;
    default:
      start = startOfDay(subDays(end, 7));
  }

  return { start, end: endOfDay(end) };
};

export const calculateFTE = (hours: number): number => {
  // 173 hours per month per FTE (standard calculation)
  return hours / 173;
};

export const calculateProductivityBoost = (hoursSaved: number, totalHours: number): number => {
  if (totalHours === 0) return 0;
  return (hoursSaved / totalHours) * 100;
};

