import React from 'react';
import {useNavigate} from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      <h1>Profile Explorer</h1>
      <p>Explore profiles and their locations on the map</p>
      <button className='admin-button' onClick={() => navigate('/admin')}>Admin Portal</button>
    </header>
  );
}

export default Header;