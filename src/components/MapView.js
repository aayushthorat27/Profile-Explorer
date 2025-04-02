import React, { useEffect, useRef } from 'react';

function MapView({ profiles, selectedProfileId, center, zoom, onSelectProfile }) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  
  // Initialize the map
  useEffect(() => {
    // Load Google Maps API script if not already loaded
    if (!window.google) {
      const apiKey = process.env.REACT_APP_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
    
    function initMap() {
      if (!mapRef.current) return;
      
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });
      
      // Add markers for all profiles
      addMarkers();
    }
  }, []);
  
  // Update map when center or zoom changes
  useEffect(() => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(center);
      googleMapRef.current.setZoom(zoom);
    }
  }, [center, zoom]);
  
  // Add or update markers when profiles change
  useEffect(() => {
    if (googleMapRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Add markers for all profiles
      addMarkers();
    }
  }, [profiles, selectedProfileId]);
  
  const addMarkers = () => {
    if (!googleMapRef.current) return;
    
    profiles.forEach(profile => {
      if (profile.address && profile.address.coordinates) {
        const isSelected = profile.id === selectedProfileId;
        
        // Create marker
        const marker = new window.google.maps.Marker({
          position: profile.address.coordinates,
          map: googleMapRef.current,
          title: profile.name,
          animation: isSelected ? window.google.maps.Animation.BOUNCE : null,
          icon: {
            url: isSelected 
              ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });
        
        // Add click event listener
        marker.addListener('click', () => {
          onSelectProfile(profile.id);
        });
        
        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${profile.name}</h3>
              <p>${profile.jobTitle} at ${profile.company}</p>
              <p>${profile.address.city}, ${profile.address.state}</p>
            </div>
          `
        });
        
        marker.addListener('mouseover', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
        
        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
        
        markersRef.current.push(marker);
      }
    });
  };
  
  return (
    <div className="map-container">
      <div ref={mapRef} className="google-map"></div>
      <div className="map-overlay">
        <h3>Interactive Map</h3>
        <p>Click on a marker to view profile details</p>
      </div>
    </div>
  );
}

export default MapView;