import React, { useState } from 'react';
import { Menu, ChevronDown, LogOut, User } from 'lucide-react';
import './AppHeader.css';

const AppHeader = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    onLogout();
    setShowDropdown(false);
  };

  return (
    <div className="app-header">
      <div className="header-left">
        <Menu size={20} />
      </div>
      <div className="header-right">
        <div className="user-dropdown">
          <div 
            className="user-info"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User size={16} />
            <span>{user?.username || 'Employee'}</span>
            <ChevronDown size={16} />
          </div>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader; 