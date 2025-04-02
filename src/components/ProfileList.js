import React from 'react';

function ProfileList({ profiles, selectedProfileId, onSelectProfile }) {
  return (
    <div className="profile-list">
      <h2>Profiles</h2>
      <div className="profile-cards">
        {profiles.map(profile => (
          <div 
            key={profile.id} 
            className={`profile-card ${selectedProfileId === profile.id ? 'selected' : ''}`}
            // onClick={() => onSelectProfile(profile.id)}
          >
            <img 
              src={profile.avatar} 
              alt={`${profile.name}'s avatar`} 
              className="profile-avatar"
            />
            <div className="profile-card-content">
              <h3>{profile.name}</h3>
              <p className="profile-job">{profile.jobTitle}</p>
              <p className="profile-company">{profile.company}</p>
              <p className="profile-location">
                <span className="location-icon">📍</span> 
                {profile.address.city}, {profile.address.state}
              </p>
            </div>
            <button className='profile-select-button' onClick={() => onSelectProfile(profile.id)}> Summary </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileList;