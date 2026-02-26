import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import type {
  Habit,
  HabitFormData,
  EditHabitData,
  FilterType,
  SortType,
  DayOfWeek,
} from './types/Habit';
import type { Theme } from './types/Theme';
import {
  generateId,
  saveHabitsToStorage,
  loadHabitsFromStorage,
  createEmptyHabitDays,
  calculateStreak,
} from './utils/habitUtils';
import { saveThemeToStorage, loadThemeFromStorage } from './utils/themeUtils';
import Header from './components/Header';
import AddHabitForm from './components/AddHabitForm';
import HabitsFilter from './components/HabitsFilter';
import HabitsList from './components/HabitsList';
import SkipLink from './components/SkipLink';
import './App.css';
import './styles/components/Button.css';
import './styles/components/Modal.css';

// Eco-conception: lazy load modals (only loaded when needed)
const EditHabitModal = lazy(() => import('./components/EditHabitModal'));
const DeleteConfirmModal = lazy(() => import('./components/DeleteConfirmModal'));

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsLoaded, setHabitsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [theme, setTheme] = useState<Theme>('light');
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  // Accessibility: announce changes to screen readers
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    const savedHabits = loadHabitsFromStorage();
    setHabits(savedHabits);
    setHabitsLoaded(true);
  }, []);

  useEffect(() => {
    const savedTheme = loadThemeFromStorage();
    setTheme(savedTheme);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (habitsLoaded) {
      saveHabitsToStorage(habits);
    }
  }, [habits, habitsLoaded]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeLoaded) {
      saveThemeToStorage(theme);
    }
  }, [theme, themeLoaded]);

  // Eco-conception: useCallback to avoid unnecessary re-renders
  const addHabit = useCallback((habitData: HabitFormData): void => {
    const newHabit: Habit = {
      id: generateId(),
      name: habitData.name,
      color: habitData.color,
      completedDays: createEmptyHabitDays(),
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
    setAnnouncement(`Habit "${habitData.name}" added successfully.`);
  }, []);

  const updateHabit = useCallback((editData: EditHabitData): void => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === editData.id
          ? { ...habit, name: editData.name, color: editData.color }
          : habit
      )
    );
    setEditingHabit(null);
    setAnnouncement(`Habit "${editData.name}" updated.`);
  }, []);

  const deleteHabit = useCallback((habitId: string): void => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    setShowDeleteConfirm(null);
    setAnnouncement('Habit deleted.');
  }, []);

  const toggleHabitDay = useCallback((habitId: string, day: DayOfWeek): void => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId
          ? {
              ...habit,
              completedDays: {
                ...habit.completedDays,
                [day]: !habit.completedDays[day],
              },
            }
          : habit
      )
    );
  }, []);

  const resetAllProgress = useCallback((): void => {
    setHabits(prev =>
      prev.map(habit => ({
        ...habit,
        completedDays: createEmptyHabitDays(),
      }))
    );
    setAnnouncement('All progress has been reset.');
  }, []);

  const toggleTheme = useCallback((): void => {
    setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Eco-conception: useMemo to avoid recalculating on every render
  const filteredAndSortedHabits = useMemo(() => habits
    .filter(habit => {
      const matchesSearch = habit.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const completedDaysCount = Object.values(habit.completedDays).filter(
        Boolean
      ).length;

      switch (filter) {
        case 'completed':
          return matchesSearch && completedDaysCount === 7;
        case 'incomplete':
          return matchesSearch && completedDaysCount < 7;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'streak':
          return calculateStreak(b) - calculateStreak(a);
        case 'created':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    }), [habits, filter, sortBy, searchTerm]);

  const completedHabitsCount = useMemo(() =>
    habits.filter(
      h => Object.values(h.completedDays).filter(Boolean).length === 7
    ).length
  , [habits]);

  return (
    <div className="app">
      {/* Accessibility: Skip navigation link */}
      <SkipLink targetId="main-content" />

      {/* Accessibility: Live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetProgress={resetAllProgress}
        totalHabits={habits.length}
        completedHabits={completedHabitsCount}
      />

      <main id="main-content" className="main-content" role="main">
        <AddHabitForm onAddHabit={addHabit} />

        <HabitsFilter
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <HabitsList
          habits={filteredAndSortedHabits}
          onToggleDay={toggleHabitDay}
          onEditHabit={setEditingHabit}
          onDeleteHabit={setShowDeleteConfirm}
        />
      </main>

      {editingHabit && (
        <Suspense fallback={null}>
          <EditHabitModal
            habit={editingHabit}
            onSave={updateHabit}
            onClose={() => setEditingHabit(null)}
          />
        </Suspense>
      )}

      {showDeleteConfirm && (
        <Suspense fallback={null}>
          <DeleteConfirmModal
            onCancel={() => setShowDeleteConfirm(null)}
            onConfirm={() => deleteHabit(showDeleteConfirm)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
