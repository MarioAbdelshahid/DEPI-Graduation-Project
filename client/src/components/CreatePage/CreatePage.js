// components/CreatePage/CreatePage.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreatePage.css';

const CreatePage = ({ onPageCreated, onClose }) => {
  const [pageName, setPageName] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const createPage = async (e) => {
    e.preventDefault();
    setError('');

    const newPage = {
      name: pageName,
      description: pageDescription,
    };

    try {
      await axios.post('http://localhost:4000/api/page/createPages', newPage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPageName('');
      setPageDescription('');
      if (onPageCreated) onPageCreated();
    } catch (err) {
      setError('Failed to create page. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Create New Page</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={createPage}>
          <input
            type="text"
            placeholder="Page Name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            required
          />
          <textarea
            placeholder="Page Description"
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            rows="4"
          />
          <button type="submit">Create Page</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
