import React from 'react';
import { Search, X, Filter, ArrowUpDown } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  sortBy,
  onSortChange,
  courses
}) {
  return (
    <div className="search-filter-card">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={19} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by student name, ID, course, or section..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-item">
          <Filter size={16} className="filter-item-icon" />
          <select 
            value={courseFilter} 
            onChange={(e) => onCourseFilterChange(e.target.value)}
            className="select-dropdown"
          >
            <option value="ALL">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <ArrowUpDown size={16} className="filter-item-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="select-dropdown"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="id-asc">ID (Low to High)</option>
            <option value="id-desc">ID (High to Low)</option>
            <option value="course-asc">Course (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
