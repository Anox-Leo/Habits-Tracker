import React from 'react';
import type { FilterType, SortType } from '../types/Habit';
import '../styles/components/HabitsFilter.css';

interface HabitsFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function HabitsFilter({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}: HabitsFilterProps) {
  return (
    <section className="habits-filter" aria-label="Filter and search habits">
      <div className="filter-section">
        <div className="search-container">
          <label htmlFor="search-habits" className="sr-only">
            Search habits
          </label>
          <input
            id="search-habits"
            type="search"
            className="search-input"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search habits by name"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="filter-select" className="filter-label">
              Filter:
            </label>
            <select
              id="filter-select"
              className="filter-select"
              value={filter}
              onChange={e => onFilterChange(e.target.value as FilterType)}
            >
              <option value="all">All Habits</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select" className="filter-label">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={e => onSortChange(e.target.value as SortType)}
            >
              <option value="created">Date Created</option>
              <option value="name">Name</option>
              <option value="streak">Streak Length</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HabitsFilter;
