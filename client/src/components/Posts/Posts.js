import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar'; // Reuse the Avatar component
import CommentsList from '../CommentsList/CommentsList';
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
        response = await axios.get(`http://localhost:4000/api/post/getPostsByPage/${pageSpecific}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await axios.get(`http://localhost:4000/api/post/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.data.length === 0) {
        setError('No posts found for this page');
      } else {
        setPosts(response.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh, userSpecific, pageSpecific]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="post-header-container">
              <div className="post-user-info">
                <Avatar src={post.postedBy?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URjWpcZfPfzAHxrU_Xms2GzfUJmvWXGjuw&s'} n={48} />
                <div className="post-user-name-date">
                  <p className="post-user-name">{post.postedBy?.name || 'Unknown User'}</p>
                </div>
                <div className="post-date">{new Date(post.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            {post.header && <div className="post-header">{post.header}</div>}

            <div className="post-content">
              {post.content?.text && <p>{post.content.text}</p>}
              {post.content?.image && <img src={post.content.image} alt="Post content" />}
              {post.content?.video && <video controls src={post.content.video}></video>}
            </div>

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
