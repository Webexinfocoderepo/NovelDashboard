import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, RefreshCw, Trash2 } from 'lucide-react';
import { apiService } from '../services/api';
import './DataTable.css';

const DataTable = ({ showEntries, setShowEntries, filterData }) => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = [
    { key: 'sno', label: 'S.No', sortable: false },
    { key: 'projectId', label: 'Project ID', sortable: true },
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'ip', label: 'IP Address', sortable: true },
    { key: 'createdAt', label: 'Date & Time', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const data = await apiService.getVisitors();
      setVisitors(data);
      setError(null);
    } catch (err) {
      setError('Failed to load visitor data');
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      try {
        await apiService.deleteVisitor(id);
        fetchVisitors(); // refresh table
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete visitor");
      }
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Filter and paginate data
  const filteredData = visitors.filter(visitor => {
    if (filterData?.searchTerm) {
      const searchLower = filterData.searchTerm.toLowerCase();
      const projectId = visitor.projectId?.toString().toLowerCase() || '';
      const userId = visitor.userId?.toString().toLowerCase() || '';
      const status = visitor.status?.toString().toLowerCase() || '';
      const ip = visitor.ip?.toString().toLowerCase() || '';
      const matchesSearch = (
        projectId.includes(searchLower) ||
        userId.includes(searchLower) ||
        status.includes(searchLower) ||
        ip.includes(searchLower)
      );
      if (!matchesSearch) return false;
    }
    if (filterData?.projectId) {
      const visitorProjectId = visitor.projectId?.toString().toLowerCase() || '';
      if (!visitorProjectId.includes(filterData.projectId.toLowerCase())) {
        return false;
      }
    }
    if (filterData?.status) {
      const visitorStatus = visitor.status?.toString().toLowerCase() || '';
      if (visitorStatus !== filterData.status.toLowerCase()) {
        return false;
      }
    }
    return true;
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleRefresh = () => {
    fetchVisitors();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="data-table-container">
        <div className="table-controls">
          <div className="entries-control">
            <label>Show</label>
            <select 
              value={showEntries} 
              onChange={(e) => setShowEntries(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>
          
          <div className="refresh-control">
            <RefreshCw size={16} onClick={handleRefresh} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="loading-state">
          <RefreshCw size={24} className="spinning" />
          <p>Loading visitor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {/* Table Controls */}
      <div className="table-controls">
        <div className="entries-control">
          <label>Show</label>
          <select 
            value={showEntries} 
            onChange={(e) => setShowEntries(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
        
        <div className="refresh-control">
          <RefreshCw size={16} onClick={handleRefresh} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header.key} className="table-header">
                  <div className="header-content">
                    <span>{header.label}</span>
                    {header.sortable && (
                      <div className="sort-icons">
                        <ChevronUp size={12} />
                        <ChevronDown size={12} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((visitor, index) => (
                <tr key={visitor._id || index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{visitor.projectId}</td>
                  <td>{visitor.userId}</td>
                  <td>
                    <span className={`status-badge status-${visitor.status?.toLowerCase()}`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td>{visitor.ip}</td>
                  <td>{formatDate(visitor.createdAt)}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(visitor._id)} 
                      className="delete-btn"
                      title="Delete"
                    >
                      <Trash2 size={16} color="red" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="no-data">
                  {error ? error : 'No visitor data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-info">
        <div className="entries-info">
          Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
        </div>
        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button 
            className="pagination-btn" 
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
