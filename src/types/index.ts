// Database types matching Supabase schema

export interface Client {
  id: string;
  business_name: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export interface Call {
  id: string;
  client_id: string;
  timestamp: string;
  direction: string;
  status: 'answered' | 'missed' | 'failed';
  duration_seconds: number;
  outcome: string;
  estimated_value: number;
  phone: string;
  created_at: string;
}

export interface DailyStats {
  id: string;
  client_id: string;
  date: string;
  total_calls: number;
  answered_calls: number;
  missed_calls: number;
  avg_duration: number;
  estimated_loss_daily: number;
  estimated_savings_daily: number;
  hours_saved: number;
  fte_saved: number;
  productivity_boost: number;
  created_at: string;
}

export interface Lead {
  id?: string;
  client_id: string;
  caller_name?: string;
  phone: string;
  outcome: string;
  estimated_value: number;
  assigned_to?: string;
  status: 'new' | 'hot' | 'follow-up' | 'converted';
  created_at?: string;
}

export interface UserMetadata {
  clientId?: string;
  role?: 'client' | 'admin';
}

export type TimeFilter = 'day' | 'week' | 'month' | 'year';

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

