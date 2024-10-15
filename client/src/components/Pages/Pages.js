import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import './Pages.css';

const Pages = ({ refresh }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPages = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/page/getPages', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setPages(response.data);
    } catch (err) {
      setError('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [refresh]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pages-container">
      {pages.length > 0 ? (
        pages.map((page) => (
          <div className="page-item" key={page._id}>
            <Avatar src={page.pageImage || 'https://cdn-icons-png.flaticon.com/512/1804/1804066.png'} n={48} />
            <div className="page-details">
              <h3 className="page-name">{page.name}</h3>
              <p className="page-meta">
                Created by {page.createdBy ? page.createdBy.name : 'Unknown'} on{' '}
                {new Date(page.createdAt).toLocaleDateString()}
              </p>
              <p className="page-description">{page.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-pages">No pages found</p>
      )}
    </div>
  );
};

export default Pages;
