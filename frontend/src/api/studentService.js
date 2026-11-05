import axiosClient from './axiosClient';

/**
 * Normalizes backend student data to a clean frontend model:
 * { id, firstname, lastname, fullName, course, section }
 */
export const normalizeStudent = (raw) => {
  if (!raw) return null;

  const id = raw.id ?? raw._id;
  const firstname = raw.firstname ?? raw.firstName ?? '';
  const lastname = raw.lastname ?? raw.lastName ?? '';
  const fullName = `${firstname} ${lastname}`.trim() || raw.name || 'Unnamed Student';

  return {
    id: id,
    firstname: firstname,
    lastname: lastname,
    fullName: fullName,
    course: raw.course || 'N/A',
    section: raw.section || 'N/A'
  };
};

/**
 * Formats payload matching Student entity in Spring Boot:
 * { firstname, lastname, course, section }
 */
export const formatStudentPayload = (formData) => {
  return {
    firstname: (formData.firstname || formData.firstName || '').trim(),
    lastname: (formData.lastname || formData.lastName || '').trim(),
    course: (formData.course || '').trim(),
    section: (formData.section || '').trim()
  };
};

export const studentService = {
  // GET /tongson/students
  async getAll() {
    const response = await axiosClient.get('');
    let list = [];
    if (Array.isArray(response.data)) {
      list = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      list = response.data.data;
    } else if (response.data && Array.isArray(response.data.value)) {
      list = response.data.value;
    }
    return list.map(normalizeStudent);
  },

  // GET /tongson/students/:id
  async getById(id) {
    const response = await axiosClient.get(`/${id}`);
    return normalizeStudent(response.data);
  },

  // POST /tongson/students
  async create(formData) {
    const payload = formatStudentPayload(formData);
    const response = await axiosClient.post('', payload);
    return normalizeStudent(response.data);
  },

  // PUT /tongson/students/:id
  async update(id, formData) {
    const payload = formatStudentPayload(formData);
    const response = await axiosClient.put(`/${id}`, payload);
    return normalizeStudent(response.data);
  },

  // DELETE /tongson/students/:id
  async delete(id) {
    const response = await axiosClient.delete(`/${id}`);
    return response.data;
  }
};
