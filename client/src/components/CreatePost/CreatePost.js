import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = ({ refreshPosts }) => {
  const [postTitle, setPostTitle] = useState('');
  const [file, setFile] = useState(null); // For file upload (image or video)
  const [contentType, setContentType] = useState('text'); // Track content type (text, image, video)
  const [textContent, setTextContent] = useState(''); // For text content
  const [error, setError] = useState('');

  // File input change handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    const formData = new FormData(); // To handle file upload
    formData.append('header', postTitle);
    formData.append('contentType', contentType);
    
    if (contentType === 'text') {
      formData.append('text', textContent);
    } else {
      formData.append('file', file); // Attach the file for image or video
    }

    try {
      const response = await axios.post('http://localhost:4000/api/post/createPost', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear inputs after submission
      setPostTitle('');
      setFile(null);
      setTextContent('');
      refreshPosts(); // Refresh post list
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />

        <div className="content-type-selector">
          <button
            type="button"
            className={contentType === 'text' ? 'active' : ''}
            onClick={() => setContentType('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={contentType === 'image' ? 'active' : ''}
            onClick={() => setContentType('image')}
          >
            Image
          </button>
          <button
            type="button"
            className={contentType === 'video' ? 'active' : ''}
            onClick={() => setContentType('video')}
          >
            Video
          </button>
        </div>

        {contentType === 'text' && (
          <textarea
            placeholder="Enter text content"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            required
          />
        )}

        {(contentType === 'image' || contentType === 'video') && (
          <input
            type="file"
            accept={contentType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            required
          />
        )}

        <button type="submit">Create Post</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
