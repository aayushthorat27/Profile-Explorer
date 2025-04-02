import React from 'react';

function ProfileDetail({ profile }) {
  if (!profile) return null;
  
  return (
    <div className="profile-detail">
      <div className="profile-header">
        <img 
          src={profile.avatar} 
          alt={`${profile.name}'s avatar`} 
          className="profile-avatar-large"
        />
        <div className="profile-header-info">
          <h2>{profile.name}</h2>
          <p className="profile-job-title">{profile.jobTitle} at {profile.company}</p>
        </div>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
        </div>
        
        <div className="profile-section">
          <h3>Address</h3>
          <p>{profile.address.street}</p>
          <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
          <p>{profile.address.country}</p>
        </div>
        
        <div className="profile-section">
          <h3>Bio</h3>
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;