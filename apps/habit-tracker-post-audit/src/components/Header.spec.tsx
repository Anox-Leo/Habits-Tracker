import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock CSS imports
jest.mock('../styles/components/Header.css', () => ({}));

describe('Header', () => {
  const defaultProps = {
    theme: 'light' as const,
    onToggleTheme: jest.fn(),
    onResetProgress: jest.fn(),
    totalHabits: 5,
    completedHabits: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render app title', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Habit Tracker')).toBeInTheDocument();
  });

  it('should display habit completion stats', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('2/5 habits completed this week')).toBeInTheDocument();
  });

  it('should toggle theme on button click', () => {
    render(<Header {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/switch to dark mode/i));
    expect(defaultProps.onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should show moon emoji in light mode', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByLabelText(/switch to dark mode/i)).toHaveTextContent('🌙');
  });

  it('should show sun emoji in dark mode', () => {
    render(<Header {...defaultProps} theme="dark" />);
    expect(screen.getByLabelText(/switch to light mode/i)).toHaveTextContent('☀️');
  });

  it('should disable reset button when no habits exist', () => {
    render(<Header {...defaultProps} totalHabits={0} completedHabits={0} />);
    const resetBtn = screen.getByLabelText(/reset all habit progress/i);
    expect(resetBtn).toBeDisabled();
  });

  it('should call onResetProgress when reset button clicked', () => {
    render(<Header {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/reset all habit progress/i));
    expect(defaultProps.onResetProgress).toHaveBeenCalledTimes(1);
  });

  // Accessibility tests
  it('should have role="banner" on header', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should have aria-label on navigation', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label');
  });

  it('should have role="toolbar" on actions', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
});
