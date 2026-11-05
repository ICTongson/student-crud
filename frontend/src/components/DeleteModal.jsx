import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  student,
  onClose,
  onConfirm,
  isDeleting = false
}) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content modal-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge badge-danger">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="modal-title">Delete Student</h2>
              <p className="modal-subtitle">Permanent action confirmation</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="delete-warning-text">
            Are you sure you want to delete the student record for:
          </p>
          <div className="delete-target-card">
            <span className="target-name">{student.firstname} {student.lastname}</span>
            <span className="target-meta">ID: {student.id} • Course: {student.course} • Section: {student.section}</span>
          </div>
          <p className="delete-notice">
            ⚠️ This will remove the student from the database and cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(student.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete Record</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
