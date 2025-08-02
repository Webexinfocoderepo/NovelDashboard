import React, { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import './FilterSection.css';

const FilterSection = ({ onFilterChange }) => {
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ projectId, status, searchTerm });
  };

  // Real-time search update
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({ projectId, status, searchTerm: newSearchTerm });
  };

  // Reset all filters
  const handleReset = () => {
    setProjectId('');
    setStatus('');
    setSearchTerm('');
    onFilterChange({ projectId: '', status: '', searchTerm: '' });
  };

  return (
    <div className="filter-section">
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-row">
          <div className="filter-field">
            <label htmlFor="projectId">Project Id</label>
            <input
              type="text"
              id="projectId"
              placeholder="Project Id"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </div>
          <div className="filter-field">
            <label htmlFor="status">Status</label>
            <div className="select-wrapper">
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="complete">Complete</option>
                <option value="quotafull">Quotafull</option>
                <option value="terminate">Terminate</option>
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
          </div>
          <div className="filter-field">
            <label htmlFor="searchTerm">Complete Search</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search by Project ID, User ID, Status, or IP..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection; 