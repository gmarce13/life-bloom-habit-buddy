
import React, { useState } from 'react';
import { Plus, Calendar, BarChart3, Grid3X3 } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import HabitDetailsModal from '../components/HabitDetailsModal';
import StatsSection from '../components/StatsSection';
import ThemeToggle from '../components/ThemeToggle';
import DailyProgressWidget from '../components/widgets/DailyProgressWidget';
import StreakWidget from '../components/widgets/StreakWidget';
import { cn } from '../lib/utils';
import { Habit } from '../types/habit';

const Index = () => {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [activeTab, setActiveTab] = useState<'habits' | 'stats' | 'widgets'>('habits');

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const todayDayOfWeek = today.getDay();
  
  const todayHabits = habits.filter(habit => habit.targetDays.includes(todayDayOfWeek));
  const completedToday = todayHabits.filter(habit => habit.completedDates.includes(todayString)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Habit Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {today.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {completedToday}/{todayHabits.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completados hoy</div>
              </div>
              
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Nuevo Hábito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('habits')}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              activeTab === 'habits'
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            )}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Hábitos
          </button>
          <button
            onClick={() => setActiveTab('widgets')}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              activeTab === 'widgets'
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            )}
          >
            <Grid3X3 className="w-4 h-4 inline mr-2" />
            Widgets
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              activeTab === 'stats'
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            )}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Estadísticas
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {activeTab === 'habits' ? (
          <div>
            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    ¡Comienza tu journey!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Crea tu primer hábito y empieza a construir una rutina que te lleve al éxito.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Crear mi primer hábito
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map((habit) => (
                  <div key={habit.id} onClick={() => setSelectedHabit(habit)} className="cursor-pointer">
                    <HabitCard
                      habit={habit}
                      onToggleCompletion={toggleHabitCompletion}
                      onDelete={deleteHabit}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'widgets' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <DailyProgressWidget habits={habits} />
            <StreakWidget habits={habits} />
          </div>
        ) : (
          <StatsSection habits={habits} />
        )}
      </div>

      {/* Modals */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />

      <HabitDetailsModal
        habit={selectedHabit}
        isOpen={!!selectedHabit}
        onClose={() => setSelectedHabit(null)}
      />
    </div>
  );
};

export default Index;
