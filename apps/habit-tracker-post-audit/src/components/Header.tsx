import React from 'react';
import type { Theme } from '../types/Theme';
import '../styles/components/Header.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onResetProgress: () => void;
  totalHabits: number;
  completedHabits: number;
}

function Header({
  theme,
  onToggleTheme,
  onResetProgress,
  totalHabits,
  completedHabits,
}: HeaderProps) {
  return (
    <header className="header" role="banner">
      <nav className="header-content" aria-label="Application navigation">
        <div className="header-left">
          <h1 className="app-title">Habit Tracker</h1>
          <div className="header-stats" aria-live="polite">
            <span className="stat" role="status">
              {completedHabits}/{totalHabits} habits completed this week
            </span>
          </div>
        </div>

        <div className="header-actions" role="toolbar" aria-label="Application actions">
          <button
            className="btn btn-secondary"
            onClick={onResetProgress}
            disabled={totalHabits === 0}
            aria-label="Reset all habit progress for this week"
          >
            Reset Progress
          </button>

          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
