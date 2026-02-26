import React from 'react';
import type { Habit } from '../types/Habit';
import type { DayOfWeek } from '../types/Habit';
import {
  DAYS_OF_WEEK,
  DAYS_DISPLAY_NAMES,
  getCompletedDaysCount,
  getCompletionPercentage,
  isHabitCompleted,
  calculateStreak,
} from '../utils/habitUtils';
import ProgressBar from './ProgressBar';
import '../styles/components/HabitCard.css';
import '../styles/components/Button.css';

interface HabitCardProps {
  habit: Habit;
  onToggleDay: (habitId: string, day: DayOfWeek) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

function HabitCard({ habit, onToggleDay, onEdit, onDelete }: HabitCardProps) {
  const completedDaysCount = getCompletedDaysCount(habit);
  const completionPercentage = getCompletionPercentage(habit);
  const isCompleted = isHabitCompleted(habit);
  const streak = calculateStreak(habit);

  return (
    <article
      className="habit-card"
      aria-label={`Habit: ${habit.name}, ${completedDaysCount} of 7 days completed`}
      style={{ '--habit-color': habit.color } as React.CSSProperties}
    >
      <div className="habit-header">
        <div className="habit-title">
          <h3 className="habit-name">
            {habit.name}
            {isCompleted && (
              <span className="completion-badge" aria-label="Fully completed">
                ✓
              </span>
            )}
          </h3>
          <div className="habit-stats">
            <span className="completion-text">{completedDaysCount}/7 days</span>
            {streak > 0 && (
              <span className="streak-badge" aria-label={`${streak} day streak`}>
                {streak} day streak
              </span>
            )}
          </div>
        </div>

        <div className="habit-actions">
          <button
            className="btn btn-small btn-secondary"
            onClick={() => onEdit(habit)}
            aria-label={`Edit habit ${habit.name}`}
          >
            Edit
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={() => onDelete(habit.id)}
            aria-label={`Delete habit ${habit.name}`}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="progress-section">
        <ProgressBar percentage={completionPercentage} color={habit.color} />
      </div>

      <fieldset className="days-container">
        <legend className="sr-only">Weekly progress for {habit.name}</legend>
        <div className="days-grid" role="group">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="day-item">
              <span className="day-label" id={`day-label-${habit.id}-${day}`}>
                {DAYS_DISPLAY_NAMES[day]}
              </span>
              <button
                className={`day-checkbox ${habit.completedDays[day] ? 'checked' : ''}`}
                onClick={() => onToggleDay(habit.id, day)}
                aria-label={`${DAYS_DISPLAY_NAMES[day]}: Mark as ${habit.completedDays[day] ? 'incomplete' : 'complete'}`}
                aria-pressed={habit.completedDays[day]}
                role="switch"
                aria-checked={habit.completedDays[day]}
              >
                {habit.completedDays[day] && (
                  <span className="checkmark" aria-hidden="true">✓</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </fieldset>
    </article>
  );
}

export default HabitCard;
