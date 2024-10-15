import React from 'react';
import Pages from '../components/Pages/Pages'; // Adjust the path accordingly


const Discover = () => {
  return (
    <div className="discover-container">
      <h2>Discover Pages</h2>
      <Pages refresh={true} /> {/* Pass a refresh prop if needed */}
    </div>
  );
};

export default Discover;
