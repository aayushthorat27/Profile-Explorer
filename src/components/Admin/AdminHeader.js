import React from 'react';

function AdminHeader({ onAddNew, searchTerm, onSearchChange }) {
  return (
    <div className="admin-header">
      <div className="admin-title">
        <h2>Profile Administration</h2>
        <p>Manage user profile information</p>
      </div>
      
      <div className="admin-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <button className="add-button" onClick={onAddNew}>
          + Add New Profile
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;