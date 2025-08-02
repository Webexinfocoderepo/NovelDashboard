import React, { useState, useEffect } from 'react';
import { ChevronUp, X, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import './ManageDataSection.css';

const ManageDataSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const visitorStats = await apiService.getVisitorStats();
      setStats(visitorStats);
      setError(null);
    } catch (err) {
      setError('Failed to load visitor statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    fetchStats();
  };

  if (loading) {
    return (
      <div className="manage-data-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Manage Data</h2>
          </div>
          <div className="section-controls">
            <RefreshCw size={20} className="spinning" />
          </div>
        </div>
        <div className="section-details">
          <p>Loading visitor statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-data-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Manage Data</h2>
          </div>
          <div className="section-controls">
            <RefreshCw size={20} onClick={handleRefresh} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className="section-details">
          <p className="error-message">{error}</p>
          <button onClick={handleRefresh} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-data-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Manage Data</h2>
        </div>
        <div className="section-controls">
          <RefreshCw size={20} onClick={handleRefresh} style={{ cursor: 'pointer' }} />
          <X size={20} />
        </div>
      </div>
      
      <div className="section-details">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Entries:</span>
            <span className="stat-value">{stats?.total || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Active Project ID:</span>
            <span className="stat-value">{Object.keys(stats?.byProject || {}).length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Recent Activity (from last 1-2 days):</span>
            <span className="stat-value">{stats?.recentActivity?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDataSection; 