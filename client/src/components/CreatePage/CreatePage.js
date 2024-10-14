import React, { useState } from 'react';
import axios from 'axios';
import './CreatePage.css'; 

const CreatePage = ({ onPageCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/pages', {
        name,
        description,
      });

      // Call the callback to refresh or do something after creating the page
      if (onPageCreated) {
        onPageCreated(response.data);
      }

      // Reset the form
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to create page. Please try again.');
    }
  };

  return (
    <div className="create-page-container">
      <h2>Create New Page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pageName">Page Name:</label>
          <input
            type="text"
            id="pageName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pageDescription">Description:</label>
          <textarea
            id="pageDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit">Create Page</button>
      </form>
    </div>
  );
};

export default CreatePage;
