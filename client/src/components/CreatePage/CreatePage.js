import React, { useState } from 'react';
import axios from 'axios';
import './CreatePage.css';

const CreatePage = ({ onPageCreated }) => {
  const [pageName, setPageName] = useState(''); // Handle page name input
  const [pageDescription, setPageDescription] = useState(''); // Handle description input
  const [error, setError] = useState(''); // Error handling
  const token = localStorage.getItem('token'); // Retrieve the token for authorization

  // Handle form submission
  const createPage = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setError(''); // Clear previous error messages

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

      // Clear form fields after successful creation
      setPageName('');
      setPageDescription('');

      // Call the callback function to notify parent component
      if (onPageCreated) {
        onPageCreated(); // You can pass additional info like the new page data if needed
      }
    } catch (err) {
      setError('Failed to create page. Please try again.');
    }
  };

  return (
    <div className="create-page-container">
      <h2>Create New Page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={createPage}>
        <div>
          <label htmlFor="pageName">Page Name:</label>
          <input
            type="text"
            id="pageName"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pageDescription">Description:</label>
          <textarea
            id="pageDescription"
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit">Create Page</button>
      </form>
    </div>
  );
};

export default CreatePage;
