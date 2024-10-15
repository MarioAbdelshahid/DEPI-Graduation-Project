import React from 'react';


const Avatar = ({ src, n }) => {
  const size = `${n}px`; 
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Optional background color
      }}
    >
      <img
        src={src}
        alt="Avatar"
        style={{
          width: size,
          height: size,
          objectFit: 'cover', // Ensures the image covers the circle
        }}
      />
    </div>
  );
};

export default Avatar;
