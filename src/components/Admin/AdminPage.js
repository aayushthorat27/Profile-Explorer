import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import ProfileTable from './ProfileTable';
import ProfileForm from './ProfileForm';
import './AdminStyles.css';

function AdminPage({ profiles, onUpdateProfiles }) {
  const [editingProfile, setEditingProfile] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered profiles when profiles or search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = profiles.filter(profile => 
        profile.name.toLowerCase().includes(term) || 
        profile.company.toLowerCase().includes(term) ||
        profile.address.city.toLowerCase().includes(term)
      );
      setFilteredProfiles(filtered);
    }
  }, [profiles, searchTerm]);

  // Handler for editing a profile
  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setIsAddingNew(false);
  };

  // Handler for adding a new profile
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProfile(null);
  };

  // Handler for deleting a profile
  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
      onUpdateProfiles(updatedProfiles);
    }
  };

  // Handler for saving profile (edit or new)
  const handleSaveProfile = (profileData) => {
    let updatedProfiles;

    if (isAddingNew) {
      // Create new profile with a unique ID
      const newProfile = {
        ...profileData,
        id: Math.max(...profiles.map(p => p.id), 0) + 1
      };
      updatedProfiles = [...profiles, newProfile];
    } else {
      // Update existing profile
      updatedProfiles = profiles.map(profile => 
        profile.id === profileData.id ? profileData : profile
      );
    }

    onUpdateProfiles(updatedProfiles);
    setEditingProfile(null);
    setIsAddingNew(false);
  };

  // Handler for canceling edit/add
  const handleCancel = () => {
    setEditingProfile(null);
    setIsAddingNew(false);
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="admin-page">
      <AdminHeader 
        onAddNew={handleAddNew}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      <div className="admin-content">
        <div className="admin-table-container">
          <ProfileTable 
            profiles={filteredProfiles}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        </div>
        
        {(editingProfile || isAddingNew) && (
          <div className="admin-form-container">
            <ProfileForm 
              profile={isAddingNew ? null : editingProfile}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;