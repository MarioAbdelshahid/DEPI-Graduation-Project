import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsList from '../CommentsList/CommentsList'; // Adjust the path accordingly
import './Posts.css';

const Posts = ({ refresh, userSpecific, pageSpecific }) => { 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (userSpecific) {
        response = await axios.get(`http://localhost:4000/api/post/getPostsByUser/${userId}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else if (pageSpecific) {
        // Implement logic for fetching posts specific to a page if required
      } else {
        response = await axios.get(`http://localhost:4000/api/post/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts or refresh changes
  }, [refresh, userSpecific, pageSpecific]); // Dependency array includes refresh and userSpecific

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <h3 className="post-header">{post.header}</h3>
            <p className="post-content">{post.content?.text}</p>
            {/* Render CommentsList for each post */}
            <CommentsList postId={post._id} />
          </div>
        ))
      ) : (
        <p className="no-posts">No posts found</p>
      )}
    </div>
  );
};

export default Posts;
