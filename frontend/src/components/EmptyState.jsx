import React from 'react';
import { Users, SearchX, Plus, RefreshCw } from 'lucide-react';

export default function EmptyState({ 
  isSearching = false, 
  onAddClick, 
  onClearFilters 
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrapper">
        {isSearching ? <SearchX size={44} /> : <Users size={44} />}
      </div>

      <h3 className="empty-state-title">
        {isSearching ? 'No Matching Students Found' : 'No Students Registered Yet'}
      </h3>

      <p className="empty-state-subtitle">
        {isSearching
          ? 'Try adjusting your search criteria, clearing course filters, or checking for typos.'
          : 'Get started by creating your very first student record using the button below.'}
      </p>

      <div className="empty-state-actions">
        {isSearching ? (
          <button
            type="button"
            className="btn btn-secondary icon-btn"
            onClick={onClearFilters}
          >
            <RefreshCw size={16} />
            <span>Clear Filters</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddClick}
          >
            <Plus size={18} />
            <span>Add First Student</span>
          </button>
        )}
      </div>
    </div>
  );
}
