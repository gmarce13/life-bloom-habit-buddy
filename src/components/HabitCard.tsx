
import React from 'react';
import { Habit } from '../types/habit';
import { CheckCircle2, Circle, Flame, Target, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleCompletion, onDelete }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  const todayDayOfWeek = new Date().getDay();
  const isTargetDay = habit.targetDays.includes(todayDayOfWeek);
  
  // Calcular progreso semanal
  const currentWeek = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    currentWeek.push(date.toISOString().split('T')[0]);
  }
  
  const weeklyCompletion = currentWeek.filter(date => habit.completedDates.includes(date)).length;
  const weeklyTarget = currentWeek.filter(date => {
    const dayOfWeek = new Date(date).getDay();
    return habit.targetDays.includes(dayOfWeek);
  }).length;
  
  const completionPercentage = weeklyTarget > 0 ? (weeklyCompletion / weeklyTarget) * 100 : 0;

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105",
      isCompletedToday && "ring-2 ring-green-500 ring-opacity-50"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{habit.name}</h3>
          {habit.description && (
            <p className="text-gray-600 text-sm">{habit.description}</p>
          )}
        </div>
        <button
          onClick={() => onToggleCompletion(habit.id, today)}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            isCompletedToday 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : isTargetDay 
                ? "bg-gray-100 hover:bg-gray-200 text-gray-600" 
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
          )}
          disabled={!isTargetDay}
        >
          {isCompletedToday ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {/* Progreso circular */}
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                className={cn(
                  "transition-all duration-500",
                  completionPercentage >= 80 ? "text-green-500" :
                  completionPercentage >= 60 ? "text-yellow-500" :
                  completionPercentage >= 40 ? "text-orange-500" : "text-red-500"
                )}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-xs text-gray-600">Racha</span>
            </div>
            <div className="font-bold text-lg text-gray-800">{habit.streak}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs text-gray-600">Mejor</span>
            </div>
            <div className="font-bold text-lg text-gray-800">{habit.longestStreak}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-xs text-gray-600">Semana</span>
            </div>
            <div className="font-bold text-lg text-gray-800">{weeklyCompletion}/{weeklyTarget}</div>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="flex justify-between">
          {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, index) => {
            const dayIndex = index;
            const isTargetDay = habit.targetDays.includes(dayIndex);
            const dayDate = currentWeek[index];
            const isCompleted = habit.completedDates.includes(dayDate);
            
            return (
              <div
                key={day}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  isCompleted 
                    ? "bg-green-500 text-white" 
                    : isTargetDay 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onDelete(habit.id)}
        className="mt-4 w-full text-sm text-red-500 hover:text-red-700 transition-colors"
      >
        Eliminar hábito
      </button>
    </div>
  );
};

export default HabitCard;
