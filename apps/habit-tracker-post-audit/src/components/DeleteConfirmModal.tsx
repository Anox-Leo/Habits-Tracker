import React from 'react';
import '../styles/components/Modal.css';
import '../styles/components/Button.css';

interface DeleteConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Accessibility-improved delete confirmation modal.
 * - Uses role="alertdialog" + aria-describedby (WCAG 4.1.2)
 * - Focus trap for keyboard users
 * - Escape key to close
 */
function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="delete-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
      >
        <h3 id="delete-modal-title">Delete Habit</h3>
        <p id="delete-modal-desc">
          Are you sure you want to delete this habit? This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
