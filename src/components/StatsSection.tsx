
import React from 'react';
import { Habit } from '../types/habit';
import { TrendingUp, Calendar, Flame, Target } from 'lucide-react';

interface StatsSectionProps {
  habits: Habit[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Calcular estadísticas
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completedDates.includes(today)).length;
  const averageStreak = habits.length > 0 ? Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length) : 0;
  const longestStreakOverall = Math.max(...habits.map(habit => habit.longestStreak), 0);
  
  // Calcular progreso semanal
  const currentWeek = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    currentWeek.push(date.toISOString().split('T')[0]);
  }
  
  const weeklyProgress = currentWeek.map(date => {
    const dayHabits = habits.filter(habit => {
      const dayOfWeek = new Date(date).getDay();
      return habit.targetDays.includes(dayOfWeek);
    });
    const completedHabits = dayHabits.filter(habit => habit.completedDates.includes(date));
    return dayHabits.length > 0 ? (completedHabits.length / dayHabits.length) * 100 : 0;
  });

  const stats = [
    {
      icon: Calendar,
      label: 'Completados Hoy',
      value: `${completedToday}/${totalHabits}`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Flame,
      label: 'Racha Promedio',
      value: averageStreak.toString(),
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Target,
      label: 'Mejor Racha',
      value: longestStreakOverall.toString(),
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      label: 'Progreso Semanal',
      value: `${Math.round(weeklyProgress.reduce((sum, day) => sum + day, 0) / 7)}%`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Estadísticas</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-4 text-center`}>
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-bold text-lg text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Gráfico de progreso semanal */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Progreso de los últimos 7 días</h3>
        <div className="flex items-end justify-between h-24 gap-2">
          {weeklyProgress.map((progress, index) => {
            const date = new Date(currentWeek[index]);
            const dayName = ['D', 'L', 'M', 'X', 'J', 'V', 'S'][date.getDay()];
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg flex items-end" style={{ height: '80px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${Math.max(progress, 5)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">{dayName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
