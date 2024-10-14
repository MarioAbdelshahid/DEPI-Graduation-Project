import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Posts.css';

const Posts = ({ refresh }) => { // Accept refresh as a prop
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/post/getPostsByUser/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts or refresh changes
  }, [refresh]); // Dependency array includes refresh

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="posts-container">
      <h2>User's Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <h3 className="post-header">{post.header}</h3>
            <p className="post-content">{post.content?.text}</p>
          </div>
        ))
      ) : (
        <p className="no-posts">No posts found</p>
      )}
    </div>
  );
};

export default Posts;
