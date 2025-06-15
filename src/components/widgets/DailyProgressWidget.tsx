
import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { Habit } from '../../types/habit';
import Widget from '../Widget';

interface DailyProgressWidgetProps {
  habits: Habit[];
}

const DailyProgressWidget: React.FC<DailyProgressWidgetProps> = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayDayOfWeek = new Date().getDay();
  
  const todayHabits = habits.filter(habit => habit.targetDays.includes(todayDayOfWeek));
  const completedToday = todayHabits.filter(habit => habit.completedDates.includes(today)).length;
  const progress = todayHabits.length > 0 ? (completedToday / todayHabits.length) * 100 : 0;

  return (
    <Widget title="Progreso de Hoy" size="small">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {completedToday}/{todayHabits.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(progress)}% completado
          </div>
        </div>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              className="text-green-500 transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <Target className="absolute inset-0 w-6 h-6 text-green-500 m-auto" />
        </div>
      </div>
    </Widget>
  );
};

export default DailyProgressWidget;
