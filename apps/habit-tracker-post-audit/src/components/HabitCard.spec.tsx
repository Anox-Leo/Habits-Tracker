import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HabitCard from './HabitCard';
import type { Habit } from '../types/Habit';
import { createEmptyHabitDays } from '../utils/habitUtils';

// Mock CSS imports
jest.mock('../styles/components/HabitCard.css', () => ({}));
jest.mock('../styles/components/Button.css', () => ({}));
jest.mock('../styles/components/ProgressBar.css', () => ({}));

const createTestHabit = (overrides?: Partial<Habit>): Habit => ({
  id: 'test-1',
  name: 'Exercise',
  color: '#FF6B6B',
  completedDays: createEmptyHabitDays(),
  createdAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

describe('HabitCard', () => {
  const mockOnToggleDay = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const defaultProps = {
    habit: createTestHabit(),
    onToggleDay: mockOnToggleDay,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render habit name', () => {
    render(<HabitCard {...defaultProps} />);
    expect(screen.getByText('Exercise')).toBeInTheDocument();
  });

  it('should render days completed count', () => {
    render(<HabitCard {...defaultProps} />);
    expect(screen.getByText('0/7 days')).toBeInTheDocument();
  });

  it('should render a progress bar', () => {
    render(<HabitCard {...defaultProps} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render 7 day toggle buttons', () => {
    render(<HabitCard {...defaultProps} />);
    const dayButtons = screen.getAllByRole('switch');
    expect(dayButtons).toHaveLength(7);
  });

  it('should toggle day when day button is clicked', () => {
    render(<HabitCard {...defaultProps} />);
    const monButton = screen.getByLabelText(/Mon.*complete/i);
    fireEvent.click(monButton);
    expect(mockOnToggleDay).toHaveBeenCalledWith('test-1', 'monday');
  });

  it('should show completion badge when all days completed', () => {
    const allComplete = createTestHabit({
      completedDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    });
    render(<HabitCard {...defaultProps} habit={allComplete} />);
    expect(screen.getByLabelText('Fully completed')).toBeInTheDocument();
  });

  it('should show streak badge when streak > 0', () => {
    const withStreak = createTestHabit({
      completedDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    });
    render(<HabitCard {...defaultProps} habit={withStreak} />);
    expect(screen.getByText('3 day streak')).toBeInTheDocument();
  });

  it('should always show edit button', () => {
    render(<HabitCard {...defaultProps} />);
    const editBtn = screen.getByLabelText(/edit habit exercise/i);
    expect(editBtn).toBeInTheDocument();
  });

  it('should always show delete button (a11y improvement)', () => {
    render(<HabitCard {...defaultProps} />);
    const deleteBtn = screen.getByLabelText(/delete habit exercise/i);
    expect(deleteBtn).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<HabitCard {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/edit habit exercise/i));
    expect(mockOnEdit).toHaveBeenCalledWith(defaultProps.habit);
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<HabitCard {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/delete habit exercise/i));
    expect(mockOnDelete).toHaveBeenCalledWith('test-1');
  });

  // Accessibility
  it('should use article element with accessible label', () => {
    render(<HabitCard {...defaultProps} />);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', expect.stringContaining('Exercise'));
  });

  it('should have aria-pressed on day buttons', () => {
    const habit = createTestHabit({
      completedDays: {
        ...createEmptyHabitDays(),
        monday: true,
      },
    });
    render(<HabitCard {...defaultProps} habit={habit} />);
    const monButton = screen.getByLabelText(/Mon.*incomplete/i);
    expect(monButton).toHaveAttribute('aria-pressed', 'true');
  });
});
