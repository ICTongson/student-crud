import React from 'react';
import { Edit2, Trash2, Eye, BookOpen, Hash, Layers } from 'lucide-react';

export default function StudentCard({ student, onView, onEdit, onDelete }) {
  return (
    <div className="student-mobile-card">
      <div className="card-top-row">
        <div className="card-student-info">
          <span className="card-name">{student.firstname} {student.lastname}</span>
        </div>
        <span className="badge badge-id">
          <Hash size={11} className="inline-icon" />
          ID: {student.id}
        </span>
      </div>

      <div className="card-details-row">
        <div className="card-detail-item">
          <span className="detail-label">Course:</span>
          <span className="badge badge-course">
            <BookOpen size={11} className="inline-icon" />
            {student.course}
          </span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">Section:</span>
          <span className="badge badge-section">
            <Layers size={11} className="inline-icon" />
            {student.section}
          </span>
        </div>
      </div>

      <div className="card-actions-row">
        <button
          type="button"
          className="btn btn-secondary card-action-btn"
          onClick={() => onView(student)}
        >
          <Eye size={15} />
          <span>View</span>
        </button>
        <button
          type="button"
          className="btn btn-secondary card-action-btn"
          onClick={() => onEdit(student)}
        >
          <Edit2 size={15} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="btn btn-danger-outline card-action-btn"
          onClick={() => onDelete(student)}
        >
          <Trash2 size={15} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
