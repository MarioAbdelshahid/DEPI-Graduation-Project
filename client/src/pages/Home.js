import React, { useState } from 'react';
import Posts from '../components/Posts/Posts';
import axios from 'axios';
import './styles/Home.css';

const Home = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState('');
  const [refreshPosts, setRefreshPosts] = useState(false); // Trigger for refetching posts
  const userID = localStorage.getItem('userId');

  const createPost = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem('token');
    const newPost = {
      header: postTitle,
      content: { text: postContent },
    };

    try {
      await axios.post('http://localhost:4000/api/post/createPost', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Clear input fields after successful post creation
      setPostTitle('');
      setPostContent('');
      setRefreshPosts(prev => !prev); // Trigger posts refresh
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
      <form onSubmit={createPost}>
        <h2>Create a Post</h2>
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
          required
        />
        <button type="submit">Add Post</button>
        {error && <div className="error">{error}</div>}
      </form>
      <Posts refresh={refreshPosts} userSpecific = {userID} /> 
    </div>
  );
};

export default Home;
