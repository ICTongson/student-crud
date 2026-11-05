import React from 'react';
import { Edit2, Trash2, Eye, BookOpen, Hash, Layers } from 'lucide-react';

const getInitials = (firstname, lastname) => {
  const f = (firstname || '').trim()[0] || '';
  const l = (lastname || '').trim()[0] || '';
  return (f + l).toUpperCase() || 'S';
};

const getAvatarColor = (name) => {
  const colors = [
    '#4F46E5', '#2563EB', '#0D9488', '#059669', 
    '#D97706', '#DC2626', '#7C3AED', '#DB2777'
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function StudentTable({ 
  students, 
  onView, 
  onEdit, 
  onDelete 
}) {
  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Course</th>
            <th>Section</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const avatarBg = getAvatarColor(student.fullName);
            const initials = getInitials(student.firstname, student.lastname);

            return (
              <tr key={student.id} className="table-row">
                <td>
                  <span className="badge badge-id">
                    <Hash size={12} className="inline-icon" />
                    {student.id}
                  </span>
                </td>

                <td>
                  <div className="student-profile-cell">
                    <div 
                      className="avatar-circle" 
                      style={{ backgroundColor: avatarBg }}
                    >
                      {initials}
                    </div>
                    <div className="student-meta">
                      <span className="student-name">
                        {student.firstname} {student.lastname}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-course">
                    <BookOpen size={12} className="inline-icon" />
                    {student.course}
                  </span>
                </td>

                <td>
                  <span className="badge badge-section">
                    <Layers size={12} className="inline-icon" />
                    {student.section}
                  </span>
                </td>

                <td>
                  <div className="action-buttons-cell">
                    <button
                      type="button"
                      className="action-btn action-view"
                      onClick={() => onView(student)}
                      title="View Student"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="action-btn action-edit"
                      onClick={() => onEdit(student)}
                      title="Edit Student"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="action-btn action-delete"
                      onClick={() => onDelete(student)}
                      title="Delete Student"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
