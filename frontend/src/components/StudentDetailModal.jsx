import React from 'react';
import { X, User, BookOpen, Hash, Layers, Edit2 } from 'lucide-react';

export default function StudentDetailModal({
  isOpen,
  student,
  onClose,
  onEdit
}) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content modal-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <User size={20} />
            </div>
            <div>
              <h2 className="modal-title">Student Profile</h2>
              <p className="modal-subtitle">Detailed record information</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-hero">
            <div className="detail-avatar">
              {student.firstname ? student.firstname[0].toUpperCase() : 'S'}
            </div>
            <div>
              <h3 className="detail-hero-name">{student.firstname} {student.lastname}</h3>
              <p className="detail-hero-email">Student ID #{student.id}</p>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-box">
              <span className="detail-box-label">
                <Hash size={14} className="inline-icon" /> ID
              </span>
              <span className="detail-box-value">{student.id}</span>
            </div>

            <div className="detail-box">
              <span className="detail-box-label">
                <BookOpen size={14} className="inline-icon" /> Course
              </span>
              <span className="detail-box-value">{student.course}</span>
            </div>

            <div className="detail-box">
              <span className="detail-box-label">
                <Layers size={14} className="inline-icon" /> Section
              </span>
              <span className="detail-box-value">{student.section}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
