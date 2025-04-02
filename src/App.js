// App.js - Main application component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import MapView from './components/MapView';
import ProfileDetail from './components/ProfileDetail';
import AdminPage from './components/Admin/AdminPage';
import Header from './components/Header';
import './App.css';

// Sample profile data (in a real app, this would come from an API)
const sampleProfiles = [
  {
    id: 1,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    company: "Tech Innovations Inc.",
    jobTitle: "Senior Developer",
    bio: "Experienced developer with a passion for creating user-friendly applications."
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "john.doe@example.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Oak Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "United States",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    company: "Design Masters",
    jobTitle: "UX Designer",
    bio: "Creative designer focused on building intuitive user experiences."
  },
  {
    id: 3,
    name: "Emily Chen",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    email: "emily.chen@example.com",
    phone: "+1 (555) 345-6789",
    address: {
      street: "789 Pine Street",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "United States",
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    company: "Cloud Systems",
    jobTitle: "Data Engineer",
    bio: "Data specialist with expertise in cloud infrastructure and big data solutions."
  },
  {
    id: 4,
    name: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 789-0123",
    address: {
      street: "101 Maple Drive",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "United States",
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    company: "Financial Experts Ltd.",
    jobTitle: "Financial Analyst",
    bio: "Finance professional specializing in market analysis and investment strategies."
  },
  {
    id: 5,
    name: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    address: {
      street: "202 Cedar Road",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "United States",
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    company: "Green Earth Initiatives",
    jobTitle: "Environmental Scientist",
    bio: "Scientist dedicated to developing sustainable environmental solutions."
  }
];

// console.log(sampleProfiles.length);

function App() {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);

  // Handle profile selection
  const handleProfileSelect = (profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    setSelectedProfile(profile);
    
    // Center map on the selected profile's location
    if (profile && profile.address.coordinates) {
      setMapCenter(profile.address.coordinates);
      setMapZoom(12);
    }
  };

  const handleUpdateProfiles = (updatedProfiles) => {
    const validatedProfiles = updatedProfiles.map(profile => ({
      ...profile,
      address: profile.address || {
        street: '',
        city: 'Unknown City',
        state: 'Unknown State',
        zipCode: '',
        country: '',
        coordinates: { lat: 0, lng: 0 },
      },
    }));
    setProfiles(validatedProfiles);
  }

  // Load profiles (would fetch from API in a real application)
  useEffect(() => {
    // In a real app, you would fetch data here
    // Example: 
    // fetch('/api/profiles')
    //   .then(response => response.json())
    //   .then(data => setProfiles(data));
  }, []);

  return (
    <div className="app">
      <Router>
        {/* <Routes> */}
      <Header />
      <main className="app-container">
        <div className="sidebar">
          <ProfileList 
            profiles={profiles} 
            selectedProfileId={selectedProfile?.id}
            onSelectProfile={handleProfileSelect} 
            />
        </div>
        <div className="content">
          <MapView 
            profiles={profiles}
            selectedProfileId={selectedProfile?.id}
            center={mapCenter}
            zoom={mapZoom}
            onSelectProfile={handleProfileSelect}
            />
          {selectedProfile && (
            <ProfileDetail profile={selectedProfile} />
          )}
        </div>
      </main>
        <Routes>
          <Route path='/admin' element={<AdminPage profiles={profiles} onUpdateProfiles={handleUpdateProfiles}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;