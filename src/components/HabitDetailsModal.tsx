
import React from 'react';
import { X, Calendar, TrendingUp, Target, Flame } from 'lucide-react';
import { Habit } from '../types/habit';
import { cn } from '../lib/utils';

interface HabitDetailsModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
}

const HabitDetailsModal: React.FC<HabitDetailsModalProps> = ({ habit, isOpen, onClose }) => {
  if (!isOpen || !habit) return null;

  // Calcular estadísticas detalladas
  const totalDays = habit.completedDates.length;
  const createdDate = new Date(habit.createdAt);
  const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  const consistency = daysSinceCreated > 0 ? Math.round((totalDays / daysSinceCreated) * 100) : 0;

  // Análisis por día de la semana
  const weeklyStats = [0, 0, 0, 0, 0, 0, 0];
  habit.completedDates.forEach(date => {
    const dayOfWeek = new Date(date).getDay();
    weeklyStats[dayOfWeek]++;
  });

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const maxCompletions = Math.max(...weeklyStats);

  // Generar calendario de heat map (últimos 30 días)
  const heatmapDays = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const isCompleted = habit.completedDates.includes(dateString);
    const dayOfWeek = date.getDay();
    const isTargetDay = habit.targetDays.includes(dayOfWeek);
    
    heatmapDays.push({
      date: dateString,
      isCompleted,
      isTargetDay,
      day: date.getDate()
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{habit.name}</h2>
            {habit.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{habit.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalDays}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Días completados</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{habit.streak}</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Racha actual</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{habit.longestStreak}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Mejor racha</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{consistency}%</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Consistencia</div>
            </div>
          </div>

          {/* Análisis semanal */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Análisis por día de la semana</h3>
            <div className="flex justify-between items-end h-32">
              {dayNames.map((day, index) => {
                const completions = weeklyStats[index];
                const height = maxCompletions > 0 ? (completions / maxCompletions) * 100 : 0;
                const isTargetDay = habit.targetDays.includes(index);
                
                return (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <div className="w-full mx-1 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-end" style={{ height: '100px' }}>
                      <div
                        className={cn(
                          "w-full rounded-t-lg transition-all duration-500",
                          isTargetDay 
                            ? "bg-gradient-to-t from-blue-500 to-blue-400" 
                            : "bg-gradient-to-t from-gray-400 to-gray-300"
                        )}
                        style={{ height: `${Math.max(height, 5)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">{day}</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{completions}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heat map de últimos 30 días */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Actividad de los últimos 30 días</h3>
            <div className="grid grid-cols-10 gap-1">
              {heatmapDays.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square rounded text-xs flex items-center justify-center font-medium transition-all",
                    day.isCompleted 
                      ? "bg-green-500 text-white" 
                      : day.isTargetDay 
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  )}
                  title={`${day.date} - ${day.isCompleted ? 'Completado' : 'No completado'}`}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsModal;
