import React from 'react';

function ProfileTable({ profiles, onEditProfile, onDeleteProfile }) {
  return (
    <div className="profile-table-wrapper">
      <table className="profile-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-results">No profiles found</td>
            </tr>
          ) : (
            profiles.map(profile => (
              <tr key={profile.id}>
                <td>
                  <div className="profile-name-cell">
                    <img 
                      src={profile.avatar} 
                      alt={`${profile.name}`} 
                      className="table-avatar"
                    />
                    <span>{profile.name}</span>
                  </div>
                </td>
                <td>{profile.jobTitle}</td>
                <td>{profile.company}</td>
                <td>{profile.address.city}, {profile.address.state}</td>
                <td>{profile.email}</td>
                <td className="action-buttons">
                  <button 
                    className="edit-button" 
                    onClick={() => onEditProfile(profile)}
                    title="Edit profile"
                  >
                    ✏️
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => onDeleteProfile(profile.id)}
                    title="Delete profile"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileTable;