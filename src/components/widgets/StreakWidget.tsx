
import React from 'react';
import { Flame } from 'lucide-react';
import { Habit } from '../../types/habit';
import Widget from '../Widget';

interface StreakWidgetProps {
  habits: Habit[];
}

const StreakWidget: React.FC<StreakWidgetProps> = ({ habits }) => {
  const bestStreak = Math.max(...habits.map(habit => habit.streak), 0);
  const bestHabit = habits.find(habit => habit.streak === bestStreak);
  
  return (
    <Widget title="Mejor Racha Actual" size="small">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Flame className="w-8 h-8 text-orange-500 mr-2" />
          <span className="text-3xl font-bold text-orange-500">{bestStreak}</span>
        </div>
        {bestHabit && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {bestHabit.name}
          </div>
        )}
      </div>
    </Widget>
  );
};

export default StreakWidget;
