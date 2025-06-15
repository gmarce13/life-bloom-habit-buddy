
import React, { useState } from 'react';
import { Plus, Calendar, BarChart3, Settings } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import StatsSection from '../components/StatsSection';
import { cn } from '../lib/utils';

const Index = () => {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'habits' | 'stats'>('habits');

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const todayDayOfWeek = today.getDay();
  
  const todayHabits = habits.filter(habit => habit.targetDays.includes(todayDayOfWeek));
  const completedToday = todayHabits.filter(habit => habit.completedDates.includes(todayString)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Habit Tracker</h1>
              <p className="text-gray-600 mt-1">
                {today.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {completedToday}/{todayHabits.length}
                </div>
                <div className="text-sm text-gray-600">Completados hoy</div>
              </div>
              
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
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
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('habits')}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              activeTab === 'habits'
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Hábitos
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              activeTab === 'stats'
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
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
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    ¡Comienza tu journey!
                  </h2>
                  <p className="text-gray-600 mb-6">
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
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggleCompletion={toggleHabitCompletion}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <StatsSection habits={habits} />
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
};

export default Index;
