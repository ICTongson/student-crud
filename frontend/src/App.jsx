import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import StudentCard from './components/StudentCard';
import StudentModal from './components/StudentModal';
import DeleteModal from './components/DeleteModal';
import StudentDetailModal from './components/StudentDetailModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import Toast from './components/Toast';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { studentService } from './api/studentService';
import { getApiBaseUrl } from './api/axiosClient';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Detail modal state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [studentToView, setStudentToView] = useState(null);

  // Settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, title = '') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all students
  const fetchStudents = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setRefreshing(true);
    setError(null);

    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
      setError(err.message || 'Could not connect to the Student API.');
      if (isSilent) {
        addToast('error', err.message || 'Failed to refresh students list.', 'Network Error');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Extract distinct course list
  const courses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered & Sorted list
  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          (s.firstname && s.firstname.toLowerCase().includes(q)) ||
          (s.lastname && s.lastname.toLowerCase().includes(q)) ||
          (s.course && s.course.toLowerCase().includes(q)) ||
          (s.section && s.section.toLowerCase().includes(q)) ||
          (s.id && String(s.id).includes(q))
      );
    }

    if (courseFilter !== 'ALL') {
      result = result.filter((s) => s.course === courseFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.firstname || '').localeCompare(b.firstname || '');
        case 'name-desc':
          return (b.firstname || '').localeCompare(a.firstname || '');
        case 'id-asc':
          return (Number(a.id) || 0) - (Number(b.id) || 0);
        case 'id-desc':
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        case 'course-asc':
          return (a.course || '').localeCompare(b.course || '');
        default:
          return 0;
      }
    });

    return result;
  }, [students, searchQuery, courseFilter, sortBy]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentStudent(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setModalMode('edit');
    setCurrentStudent(student);
    setModalOpen(true);
  };

  const handleOpenView = (student) => {
    setStudentToView(student);
    setDetailModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  // Submit Add / Edit
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        const created = await studentService.create(formData);
        addToast('success', `Student "${created.firstname} ${created.lastname}" added successfully!`, 'Added');
      } else {
        const updated = await studentService.update(currentStudent.id, formData);
        addToast('success', `Student "${updated.firstname} ${updated.lastname}" updated successfully!`, 'Updated');
      }
      setModalOpen(false);
      await fetchStudents(true);
    } catch (err) {
      console.error('Submission error:', err);
      addToast('error', err.message || 'Operation failed. Verify backend server.', 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDeleteConfirm = async (id) => {
    setDeleting(true);
    try {
      await studentService.delete(id);
      addToast('success', `Student #${id} deleted successfully.`, 'Deleted');
      setDeleteModalOpen(false);
      setStudentToDelete(null);
      await fetchStudents(true);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('error', err.message || 'Failed to delete record.', 'Delete Error');
    } finally {
      setDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCourseFilter('ALL');
  };

  return (
    <div className="app-wrapper">
      <Navbar
        totalCount={students.length}
        onAddClick={handleOpenAdd}
        onRefresh={() => fetchStudents(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        isRefreshing={refreshing}
        apiUrl={apiUrl}
      />

      <main className="main-container">
        {error && (
          <div className="connection-alert alert-error" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={20} />
            <div style={{ flex: 1 }}>
              <strong>API Connectivity Notice:</strong> {error}
              <div style={{ fontSize: '0.8rem', color: '#7f1d1d', marginTop: '4px' }}>
                💡 <em>Tip: Render free tier spins down after inactivity (takes ~50s to wake up). If your backend URL has a unique suffix (e.g. <code>student-backend-xxxx.onrender.com</code>), click "API Settings" below to update it.</em>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary icon-btn"
                onClick={() => setSettingsOpen(true)}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                API Settings
              </button>
              <button
                type="button"
                className="btn btn-secondary icon-btn"
                onClick={() => fetchStudents()}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                <RefreshCw size={14} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          courseFilter={courseFilter}
          onCourseFilterChange={setCourseFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          courses={courses}
        />

        {loading ? (
          <LoadingSpinner message="Loading students from Spring Boot API..." />
        ) : filteredStudents.length === 0 ? (
          <EmptyState
            isSearching={Boolean(searchQuery || courseFilter !== 'ALL')}
            onAddClick={handleOpenAdd}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            <div className="table-card">
              <StudentTable
                students={filteredStudents}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            </div>

            <div className="mobile-cards-list">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onView={handleOpenView}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <StudentModal
        isOpen={modalOpen}
        mode={modalMode}
        initialData={currentStudent}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={submitting}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        student={studentToDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleting}
      />

      <StudentDetailModal
        isOpen={detailModalOpen}
        student={studentToView}
        onClose={() => {
          setDetailModalOpen(false);
          setStudentToView(null);
        }}
        onEdit={(student) => {
          setDetailModalOpen(false);
          handleOpenEdit(student);
        }}
      />

      <ApiSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onApiUrlChanged={(newUrl) => {
          setApiUrl(newUrl);
          fetchStudents(true);
        }}
      />

      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
