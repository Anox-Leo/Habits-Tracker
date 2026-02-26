import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from './ProgressBar';

// Mock CSS imports
jest.mock('../styles/components/ProgressBar.css', () => ({}));

describe('ProgressBar', () => {
  it('should render with correct aria attributes', () => {
    render(<ProgressBar percentage={50} color="#FF6B6B" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should display percentage text', () => {
    render(<ProgressBar percentage={75} color="#4ECDC4" />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should render 0% correctly', () => {
    render(<ProgressBar percentage={0} color="#FF6B6B" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    expect(progressbar).toHaveAttribute('aria-label', '0% complete');
  });

  it('should render 100% correctly', () => {
    render(<ProgressBar percentage={100} color="#FF6B6B" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    expect(progressbar).toHaveAttribute('aria-label', '100% complete');
  });
});
