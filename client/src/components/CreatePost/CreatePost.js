import React, { useState } from 'react';
import axios from 'axios';
import SelectPage from '../SelectPage/SelectPage'; // Adjust the path accordingly
import './CreatePost.css';

const CreatePost = ({ onPostCreated, onClose }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedPage, setSelectedPage] = useState(null); // To hold the selected page
  const [showSelectPage, setShowSelectPage] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const createPost = async (e) => {
    e.preventDefault();
    setError('');

    const newPost = {
      header: postTitle,
      content: { text: postContent },
      pageId: selectedPage ? selectedPage._id : null, // Add the selected page ID
    };

    try {
      const response = await axios.post('http://localhost:4000/api/post/createPost', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostTitle('');
      setPostContent('');
      setSelectedPage(null); // Clear selected page after post creation
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setShowSelectPage(false); // Close the page selection modal
  };

  const resetPageSelection = () => {
    setSelectedPage(null); // Reset the selected page
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Create New Post</h2>
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <button onClick={() => setShowSelectPage(true)}>
            {selectedPage ? selectedPage.name : 'Select a Page'}
          </button>
          <button className="reset-button" onClick={resetPageSelection}>
            Reset Page
          </button>
        </div>
        {showSelectPage && (
          <SelectPage onPageSelect={handlePageSelect} onClose={() => setShowSelectPage(false)} />
        )}
        <form onSubmit={createPost}>
          <input
            type="text"
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Post Content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows="4"
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
