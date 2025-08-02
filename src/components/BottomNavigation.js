import React from 'react';
import { Menu, Square, Play } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <div className="bottom-navigation">
      <div className="nav-item">
        <Menu size={20} />
      </div>
      <div className="nav-item">
        <Square size={20} />
      </div>
      <div className="nav-item">
        <Play size={20} />
      </div>
    </div>
  );
};

export default BottomNavigation; 