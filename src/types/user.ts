export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  current_level: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  total_cards: number;
  cards_learning: number;
  cards_mastered: number;
  cards_due: number;
  current_streak: number;
  longest_streak: number;
  total_reviews: number;
  reviews_today: number;
  average_accuracy: number;
}

export interface LevelProgress {
  level: {
    id: number;
    name: string;
    description: string;
  };
  total_cards: number;
  mastered_cards: number;
  progress_percentage: number;
  is_unlocked: boolean;
}
