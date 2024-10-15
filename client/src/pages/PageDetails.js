import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost/CreatePost';
import './styles/PageDetails.css';

const PageDetails = ({ pageId }) => {
  const [pageDetails, setPageDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/pages/${pageId}`);
        setPageDetails(response.data.page);
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to fetch page details');
      }
    };

    fetchPageDetails();
  }, [pageId]);

  const toggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
  };

  return (
    <div className="page-details-container">
      {error && <p className="error">{error}</p>}

      {pageDetails ? (
        <div className="page-layout">
          <div className="page-header">
            <img src={pageDetails.photo} alt={`${pageDetails.name} logo`} className="page-logo" />
            <h1>{pageDetails.name}</h1>
          </div>
          <div className="page-body">
            <div className="posts-container">
              <button onClick={toggleCreatePost}>
                {showCreatePost ? 'Cancel' : 'Create Post'}
              </button>

              {showCreatePost && <CreatePost refreshPosts={() => setPosts([...posts])} />}

              <h2>Posts</h2>
              <div className="posts-list">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="post-item">
                      <h3>{post.header}</h3>
                      <p>{post.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No posts available for this page.</p>
                )}
              </div>
            </div>
            <div className="page-info">
              <h3>Page Information</h3>
              <p><strong>Description:</strong> {pageDetails.description}</p>
              <p><strong>Created At:</strong> {new Date(pageDetails.createdAt).toLocaleDateString()}</p>
              <p><strong>Created By:</strong> {pageDetails.createdBy.name}</p> {/* Assuming createdBy contains user info */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading page details...</p>
      )}
    </div>
  );
};

export default PageDetails;
