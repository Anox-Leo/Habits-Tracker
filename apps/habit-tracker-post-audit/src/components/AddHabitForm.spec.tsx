import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddHabitForm from './AddHabitForm';

// Mock CSS imports
jest.mock('../styles/components/AddHabitForm.css', () => ({}));
jest.mock('../styles/components/Button.css', () => ({}));
jest.mock('../styles/components/ColorPicker.css', () => ({}));

describe('AddHabitForm', () => {
  const mockOnAddHabit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section title', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    expect(screen.getByText('Add New Habit')).toBeInTheDocument();
  });

  it('should have an expand/collapse toggle button', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    const toggle = screen.getByLabelText(/expand form|collapse form/i);
    expect(toggle).toBeInTheDocument();
  });

  it('should not show the form by default', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    expect(screen.queryByLabelText('Habit Name')).not.toBeInTheDocument();
  });

  it('should show the form when expand button is clicked', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    expect(screen.getByLabelText('Habit Name')).toBeInTheDocument();
  });

  it('should have the submit button disabled when name is empty', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    const submitBtn = screen.getByRole('button', { name: /add habit/i });
    expect(submitBtn).toBeDisabled();
  });

  it('should enable submit button when name has content', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    fireEvent.change(screen.getByLabelText('Habit Name'), {
      target: { value: 'Exercise' },
    });
    const submitBtn = screen.getByRole('button', { name: /add habit/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it('should call onAddHabit with form data on submit', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    fireEvent.change(screen.getByLabelText('Habit Name'), {
      target: { value: 'Exercise' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add habit/i }));
    expect(mockOnAddHabit).toHaveBeenCalledWith({
      name: 'Exercise',
      color: expect.any(String),
    });
  });

  it('should clear the form and collapse after submit', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    fireEvent.change(screen.getByLabelText('Habit Name'), {
      target: { value: 'Exercise' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add habit/i }));
    // form should collapse
    expect(screen.queryByLabelText('Habit Name')).not.toBeInTheDocument();
  });

  it('should not submit with whitespace-only name', () => {
    render(<AddHabitForm onAddHabit={mockOnAddHabit} />);
    fireEvent.click(screen.getByLabelText('Expand form'));
    fireEvent.change(screen.getByLabelText('Habit Name'), {
      target: { value: '   ' },
    });
    const submitBtn = screen.getByRole('button', { name: /add habit/i });
    expect(submitBtn).toBeDisabled();
  });
});
