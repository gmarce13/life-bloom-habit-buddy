
import { useState, useEffect } from 'react';
import { Habit, HabitCategory } from '../types/habit';

const STORAGE_KEY = 'habit-tracker-data';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem(STORAGE_KEY);
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Inicializar con algunos hábitos de ejemplo
      const defaultHabits: Habit[] = [
        {
          id: '1',
          name: 'Beber 8 vasos de agua',
          description: 'Mantenerme hidratado durante el día',
          category: 'health',
          targetDays: [1, 2, 3, 4, 5, 6, 0],
          streak: 5,
          longestStreak: 12,
          completedDates: [],
          createdAt: new Date().toISOString(),
          color: 'bg-blue-500',
          icon: 'Droplets'
        },
        {
          id: '2',
          name: 'Ejercicio 30 min',
          description: 'Actividad física diaria',
          category: 'fitness',
          targetDays: [1, 2, 3, 4, 5],
          streak: 3,
          longestStreak: 8,
          completedDates: [],
          createdAt: new Date().toISOString(),
          color: 'bg-orange-500',
          icon: 'Dumbbell'
        },
        {
          id: '3',
          name: 'Leer 20 páginas',
          description: 'Lectura diaria para aprender',
          category: 'learning',
          targetDays: [1, 2, 3, 4, 5, 6, 0],
          streak: 7,
          longestStreak: 15,
          completedDates: [],
          createdAt: new Date().toISOString(),
          color: 'bg-purple-500',
          icon: 'BookOpen'
        }
      ];
      setHabits(defaultHabits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedDates' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      streak: 0,
      longestStreak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(date);
        const newCompletedDates = isCompleted
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date].sort();
        
        // Calcular nueva racha
        const today = new Date().toISOString().split('T')[0];
        let newStreak = 0;
        let currentDate = new Date(today);
        
        while (newCompletedDates.includes(currentDate.toISOString().split('T')[0])) {
          newStreak++;
          currentDate.setDate(currentDate.getDate() - 1);
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak)
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  return {
    habits,
    addHabit,
    toggleHabitCompletion,
    deleteHabit
  };
};
