const API_BASE_URL = 'http://13.235.83.129/api';

// API service for visitor tracking
export const apiService = {
  // Get all visitors
  async getVisitors() {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors`);
      if (!response.ok) {
        throw new Error('Failed to fetch visitors');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching visitors:', error);
      throw error;
    }
  },

  // Track visitor activity
  async trackVisitor(projectId, userId, action) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/track?pid=${projectId}&uid=${userId}&action=${action}`
      );
      if (!response.ok) {
        throw new Error('Failed to track visitor');
      }
      return await response.text();
    } catch (error) {
      console.error('Error tracking visitor:', error);
      throw error;
    }
  },

  // Get visitor statistics
  async getVisitorStats() {
    try {
      const visitors = await this.getVisitors();
      
      const stats = {
        total: visitors.length,
        byStatus: {},
        byProject: {},
        recentActivity: visitors.slice(0, 10) // Last 10 activities
      };

      // Group by status
      visitors.forEach(visitor => {
        stats.byStatus[visitor.status] = (stats.byStatus[visitor.status] || 0) + 1;
        stats.byProject[visitor.projectId] = (stats.byProject[visitor.projectId] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Error getting visitor stats:', error);
      throw error;
    }
  }
}; 