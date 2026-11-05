export const validateStudentForm = (formData) => {
  const errors = {};

  const firstname = formData.firstname || formData.firstName || '';
  if (!firstname.trim()) {
    errors.firstname = 'First name is required';
  }

  const lastname = formData.lastname || formData.lastName || '';
  if (!lastname.trim()) {
    errors.lastname = 'Last name is required';
  }

  if (!formData.course || !formData.course.trim()) {
    errors.course = 'Course is required (e.g. IT, CS, BSIT)';
  }

  if (!formData.section || !formData.section.trim()) {
    errors.section = 'Section is required (e.g. 3A, 2A, WMD-3A)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
