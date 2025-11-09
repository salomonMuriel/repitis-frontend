import { create } from 'zustand';
import { supabase } from '../services/supabase';
import type { User } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/react-query';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  queryClient: QueryClient | null;
  setQueryClient: (client: QueryClient) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  queryClient: null,

  setQueryClient: (client: QueryClient) => {
    set({ queryClient: client });
  },

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, loading: false, initialized: true });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false, initialized: true });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      // Clear cache before signing in to ensure fresh start
      const { queryClient } = get();
      if (queryClient) {
        queryClient.clear();
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      set({ user: data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      // Check if email confirmation is required
      // If session is null but user exists, email confirmation is required
      const requiresConfirmation = data.user && !data.session;

      if (requiresConfirmation) {
        set({ user: null, loading: false });
        throw new Error('CONFIRMATION_REQUIRED');
      }

      set({ user: data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear cache on logout for privacy and clean state
      const { queryClient } = get();
      if (queryClient) {
        queryClient.clear();
      }

      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
