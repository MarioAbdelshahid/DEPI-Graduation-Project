import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom'; // Import Link
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

  const deletePage = async (pageID) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:4000/api/page/deletePage/${pageID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Refresh the pages after deletion
      fetchPages();
    } catch (err) {
      setError('Failed to delete page');
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
            <Link to={`/pages/${page._id}`} className="page-link">
              <Avatar src={page.pageImage || 'https://cdn-icons-png.flaticon.com/512/1804/1804066.png'} n={48} />
              <div className="page-details">
                <h3 className="page-name">{page.name}</h3>
                <p className="page-meta">
                  Created by {page.createdBy ? page.createdBy.name : 'Unknown'} on{' '}
                  {new Date(page.createdAt).toLocaleDateString()}
                </p>
                <p className="page-description">{page.description}</p>
              </div>
            </Link>
            <button onClick={() => deletePage(page._id)} className="delete-page-button">Delete</button>
          </div>
        ))
      ) : (
        <p className="no-pages">No pages found</p>
      )}
    </div>
  );
};

export default Pages;
