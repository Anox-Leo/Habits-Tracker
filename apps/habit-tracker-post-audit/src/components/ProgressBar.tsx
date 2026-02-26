import React from 'react';
import '../styles/components/ProgressBar.css';

interface ProgressBarProps {
  percentage: number;
  color: string;
}

function ProgressBar({ percentage, color }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% complete`}
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="progress-percentage" aria-hidden="true">{percentage}%</span>
    </div>
  );
}

export default ProgressBar;
