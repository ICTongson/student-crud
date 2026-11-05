import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, Loader2, AlertCircle } from 'lucide-react';
import { validateStudentForm } from '../utils/validators';

const INITIAL_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: ''
};

export default function StudentModal({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          firstname: initialData.firstname || initialData.firstName || '',
          lastname: initialData.lastname || initialData.lastName || '',
          course: initialData.course || '',
          section: initialData.section || ''
        });
      } else {
        setFormData(INITIAL_FORM);
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: validationErrors } = validateStudentForm(formData);
    if (validationErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateStudentForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      setTouched({
        firstname: true,
        lastname: true,
        course: true,
        section: true
      });
      return;
    }
    onSubmit(formData);
  };

  const isEdit = mode === 'edit';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content modal-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              {isEdit ? <Save size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h2 className="modal-title">
                {isEdit ? 'Edit Student Details' : 'Add New Student'}
              </h2>
              <p className="modal-subtitle">
                {isEdit 
                  ? `Update student record (ID: ${initialData?.id})` 
                  : 'Enter student details for the Spring Boot Student API'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* First & Last Name */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="e.g. Juan"
                  className={`form-input ${touched.firstname && errors.firstname ? 'input-error' : ''}`}
                  value={formData.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  autoFocus
                />
                {touched.firstname && errors.firstname && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.firstname}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastname" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="e.g. Dela Cruz"
                  className={`form-input ${touched.lastname && errors.lastname ? 'input-error' : ''}`}
                  value={formData.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                {touched.lastname && errors.lastname && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.lastname}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Course & Section */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course" className="form-label">
                  Course <span className="text-danger">*</span>
                </label>
                <input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="e.g. IT, CS, BSIT"
                  className={`form-input ${touched.course && errors.course ? 'input-error' : ''}`}
                  value={formData.course}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                {touched.course && errors.course && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.course}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="section" className="form-label">
                  Section <span className="text-danger">*</span>
                </label>
                <input
                  id="section"
                  name="section"
                  type="text"
                  placeholder="e.g. 3A, 2A, WMD-3A"
                  className={`form-input ${touched.section && errors.section ? 'input-error' : ''}`}
                  value={formData.section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                {touched.section && errors.section && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.section}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>{isEdit ? 'Saving Changes...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  {isEdit ? <Save size={16} /> : <UserPlus size={16} />}
                  <span>{isEdit ? 'Save Changes' : 'Create Student'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
