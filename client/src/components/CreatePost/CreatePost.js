import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';
import { Co2Sharp } from '@mui/icons-material';

const CreatePost = ({ onPostCreated, onClose }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const createPost = async (e) => {
    e.preventDefault();
    setError('');

    const newPost = {
      header: postTitle,
      content: { text: postContent },
    };

    try {
      // Capture the response from the API
      const response = await axios.post('http://localhost:4000/api/post/createPost', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Assuming the postId is returned in the response
      const postId = response.data.id; // Adjust according to your actual response structure
      console.log('created',postId);
  
      
      // Save postId to local storage
      localStorage.setItem('createdPostId', postId);

      // Clear the input fields
      setPostTitle('');
      setPostContent('');

      // Call the onPostCreated callback if provided
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Create New Post</h2>
        {error && <p className="error">{error}</p>}
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
