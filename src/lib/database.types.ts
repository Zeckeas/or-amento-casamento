import { supabase } from './supabase';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          wedding_date: string | null
          total_budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wedding_date?: string | null
          total_budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_date?: string | null
          total_budget?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      budget_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          color: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_total_spent: {
        Args: { profile_uuid: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Função para obter o perfil do usuário
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }

  return data;
};

// Função para criar um novo perfil de usuário
export const createProfile = async (id: string, weddingDate: string | null, totalBudget: number | null) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id,
      wedding_date: weddingDate,
      total_budget: totalBudget,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Erro ao criar perfil:', error);
    return null;
  }

  return data;
};

// Função para calcular o total gasto de um perfil
export const calculateTotalSpent = async (profileId: string): Promise<number> => {
  const { data, error } = await supabase
    .rpc('calculate_total_spent', { profile_uuid: profileId });

  if (error) {
    console.error('Erro ao calcular total gasto:', error);
    return 0;
  }

  return data ?? 0;
};