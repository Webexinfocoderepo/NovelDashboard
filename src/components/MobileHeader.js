import React from 'react';
import { Home, RefreshCw, Plus, Square, MoreVertical, Wifi, Signal, Battery } from 'lucide-react';
import './MobileHeader.css';

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">12:39</span>
        </div>
        <div className="status-right">
          <Wifi size={14} />
          <Signal size={14} />
          <Battery size={14} />
        </div>
      </div>
      
      {/* Browser URL Bar */}
      <div className="browser-bar">
        <div className="browser-controls">
          <Home size={16} />
          <RefreshCw size={16} />
        </div>
        <div className="url-bar">
          <span className="url">theaceresearch.com/adm</span>
        </div>
        <div className="browser-actions">
          <Plus size={16} />
          <div className="tab-count">
            <Square size={16} />
            <span className="tab-number">17</span>
          </div>
          <MoreVertical size={16} />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader; 