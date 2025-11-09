// Backend API response types (matching OpenAPI schema)

export interface CardResponse {
  id: string;
  content: string;
  content_type: 'letter' | 'syllable' | 'word';
  image_url: string | null;
  audio_url: string | null;
  level_id: number;
  is_new: boolean;
}

export interface NextCardResponse {
  card: CardResponse | null;
  session_complete: boolean;
  message?: string | null;
}

export type Rating = 1 | 2 | 3 | 4;

export interface ReviewRequest {
  rating: Rating;
}

export interface ReviewResponse {
  success: boolean;
  next_review: string;
  message?: string;
}

export interface LevelProgressItem {
  level_id: number;
  level_name: string;
  total_cards: number;
  mastered_cards: number;
  progress_percentage: number;
}

export interface UserStats {
  today_reviews: number;
  total_reviews: number;
  current_streak: number;
  longest_streak: number;
  level_progress: LevelProgressItem[];
  current_level: number;
}

export interface LevelResponse {
  id: number;
  name: string;
  description: string;
  mastery_threshold: number;
  is_unlocked: boolean;
  progress_percentage: number;
}

export interface TodayStats {
  new_cards_today: number;
  total_reviews_today: number;
}
