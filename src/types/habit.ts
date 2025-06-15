
export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  targetDays: number[];
  streak: number;
  longestStreak: number;
  completedDates: string[];
  createdAt: string;
  color: string;
  icon: string;
}

export type HabitCategory = 'health' | 'productivity' | 'learning' | 'social' | 'mindfulness' | 'fitness';

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}

export const HABIT_CATEGORIES: Record<HabitCategory, { name: string; color: string }> = {
  health: { name: 'Salud', color: 'bg-green-500' },
  productivity: { name: 'Productividad', color: 'bg-blue-500' },
  learning: { name: 'Aprendizaje', color: 'bg-purple-500' },
  social: { name: 'Social', color: 'bg-pink-500' },
  mindfulness: { name: 'Mindfulness', color: 'bg-indigo-500' },
  fitness: { name: 'Fitness', color: 'bg-orange-500' }
};
