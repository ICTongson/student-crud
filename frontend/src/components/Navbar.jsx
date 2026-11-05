import React from 'react';
import { GraduationCap, Plus, Settings, RefreshCw } from 'lucide-react';

export default function Navbar({ 
  totalCount, 
  onAddClick, 
  onRefresh, 
  onOpenSettings,
  isRefreshing,
  apiUrl 
}) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">Student Hub</h1>
            <p className="brand-subtitle">Student Records & CRUD Management</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="student-badge" title="Total registered students">
            <span className="badge-dot"></span>
            <span><strong>{totalCount}</strong> Students</span>
          </div>

          <button 
            type="button"
            className="btn btn-secondary icon-btn" 
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh student records"
          >
            <RefreshCw size={17} className={isRefreshing ? 'spin' : ''} />
            <span className="btn-text">Refresh</span>
          </button>

          <button 
            type="button"
            className="btn btn-secondary icon-btn" 
            onClick={onOpenSettings}
            title={`API Base URL: ${apiUrl}`}
          >
            <Settings size={17} />
            <span className="btn-text">API Settings</span>
          </button>

          <button 
            type="button"
            className="btn btn-primary" 
            onClick={onAddClick}
          >
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
