import { supabase } from './supabase';
import type {
  NextCardResponse,
  ReviewRequest,
  ReviewResponse,
  UserStats,
  LevelResponse,
  TodayStats
} from '../types/card';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('No active session');
  }
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  };
}

export const api = {
  // Get next card for review
  async getNextCard(): Promise<NextCardResponse> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/v1/cards/next`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch next card');
    }

    return response.json();
  },

  // Submit card review
  async reviewCard(cardId: string, rating: ReviewRequest['rating']): Promise<ReviewResponse> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/v1/cards/${cardId}/review`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }

    return response.json();
  },

  // Get user statistics
  async getStats(): Promise<UserStats> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/v1/stats`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return response.json();
  },

  // Get today's statistics
  async getTodayStats(): Promise<TodayStats> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/v1/stats/today`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch today stats');
    }

    return response.json();
  },

  // Get levels with progress
  async getLevels(): Promise<LevelResponse[]> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/v1/levels`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch levels');
    }

    return response.json();
  },
};
