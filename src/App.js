import React, { useState, useEffect } from 'react';
import './App.css';
import MobileHeader from './components/MobileHeader';
import AppHeader from './components/AppHeader';
import ManageDataSection from './components/ManageDataSection';
import FilterSection from './components/FilterSection';
import DataTable from './components/DataTable';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showEntries, setShowEntries] = useState(10);
  const [filterData, setFilterData] = useState({ projectId: '', status: '', searchTerm: '' });

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (loginStatus === 'true' && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Filter handler for FilterSection
  const handleFilterChange = (filter) => {
    setFilterData(filter);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {/* Mobile Browser Header */}
      <MobileHeader />
      
      {/* Application Header */}
      <AppHeader user={user} onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="main-content">
        <ManageDataSection />
        <FilterSection onFilterChange={handleFilterChange} />
        <DataTable 
          showEntries={showEntries}
          setShowEntries={setShowEntries}
          filterData={filterData}
        />
      </div>
    </div>
  );
}

export default App; 
