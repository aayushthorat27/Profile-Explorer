import React, { useState, useEffect } from 'react';

// New empty profile template
const emptyProfile = {
  name: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  bio: '',
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default avatar
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    coordinates: { lat: 0, lng: 0 }
  }
};

function ProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState(profile || emptyProfile);
  const [errors, setErrors] = useState({});

  // Reset form when profile changes
  useEffect(() => {
    setFormData(profile || emptyProfile);
    setErrors({});
  }, [profile]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address.')) {
      // Handle nested address fields
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else if (name === 'lat' || name === 'lng') {
      // Handle coordinate fields
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          coordinates: {
            ...formData.address.coordinates,
            [name]: parseFloat(value) || 0
          }
        }
      });
    } else {
      // Handle regular fields
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation rules
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    
    // Address validation
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'ZIP code is required';
    if (!formData.address.country.trim()) newErrors['address.country'] = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  // Geocode address using Google Maps API (simulated for this example)
  const handleGeocode = () => {
    // In a real implementation, this would call the Google Geocoding API
    // For this example, we'll just set some hardcoded coordinates based on city
    const cityCoordinates = {
      'New York': { lat: 40.7128, lng: -74.0060 },
      'San Francisco': { lat: 37.7749, lng: -122.4194 },
      'Chicago': { lat: 41.8781, lng: -87.6298 },
      'Seattle': { lat: 47.6062, lng: -122.3321 },
      'Austin': { lat: 30.2672, lng: -97.7431 },
      // Default coordinates if city not found
      'default': { lat: 39.8283, lng: -98.5795 }
    };
    
    const city = formData.address.city.trim();
    const coordinates = cityCoordinates[city] || cityCoordinates.default;
    
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        coordinates
      }
    });
    
    alert(`Coordinates set: Lat ${coordinates.lat}, Lng ${coordinates.lng}`);
  };

  return (
    <div className="profile-form">
      <h3>{profile ? 'Edit Profile' : 'Add New Profile'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <h4>Basic Information</h4>
            
            <div className="form-field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="avatar">Avatar URL</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
              <div className="avatar-preview">
                <img src={formData.avatar} alt="Avatar preview" />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h4>Professional Information</h4>
            
            <div className="form-field">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? 'error' : ''}
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={errors.jobTitle ? 'error' : ''}
              />
              {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h4>Address Information</h4>
            
            <div className="form-field">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className={errors['address.street'] ? 'error' : ''}
              />
              {errors['address.street'] && <span className="error-message">{errors['address.street']}</span>}
            </div>
            
            <div className="form-field">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className={errors['address.city'] ? 'error' : ''}
              />
              {errors['address.city'] && <span className="error-message">{errors['address.city']}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="address.state">State/Province</label>
                <input
                  type="text"
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className={errors['address.state'] ? 'error' : ''}
                />
                {errors['address.state'] && <span className="error-message">{errors['address.state']}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="address.zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="address.zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className={errors['address.zipCode'] ? 'error' : ''}
                />
                {errors['address.zipCode'] && <span className="error-message">{errors['address.zipCode']}</span>}
              </div>
            </div>
            
            <div className="form-field">
              <label htmlFor="address.country">Country</label>
              <input
                type="text"
                id="address.country"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className={errors['address.country'] ? 'error' : ''}
              />
              {errors['address.country'] && <span className="error-message">{errors['address.country']}</span>}
            </div>
            
            <div className="form-section">
              <h4>Coordinates <button type="button" className="geocode-button" onClick={handleGeocode}>Set from Address</button></h4>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="lat">Latitude</label>
                  <input
                    type="number"
                    id="lat"
                    name="lat"
                    value={formData.address.coordinates.lat}
                    onChange={handleChange}
                    step="0.0001"
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="lng">Longitude</label>
                  <input
                    type="number"
                    id="lng"
                    name="lng"
                    value={formData.address.coordinates.lng}
                    onChange={handleChange}
                    step="0.0001"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;