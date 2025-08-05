import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Only create client if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && 
                           supabaseAnonKey && 
                           isValidUrl(supabaseUrl) &&
                           supabaseUrl.includes('supabase.co');

export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          description: string;
          amount: number;
          category: string;
          type: 'income' | 'expense';
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          description: string;
          amount: number;
          category: string;
          type: 'income' | 'expense';
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          description?: string;
          amount?: number;
          category?: string;
          type?: 'income' | 'expense';
          date?: string;
          created_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          social_insurance_rate: number;
          taxes_rate: number;
          additional_taxes_rate: number;
          commission_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          social_insurance_rate?: number;
          taxes_rate?: number;
          additional_taxes_rate?: number;
          commission_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          social_insurance_rate?: number;
          taxes_rate?: number;
          additional_taxes_rate?: number;
          commission_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};