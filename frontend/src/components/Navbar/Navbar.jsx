import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        Notes
      </h2>
      
      {userInfo && (
        <div className="ml-auto">
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      )}
      
      <div className="ml-auto">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;