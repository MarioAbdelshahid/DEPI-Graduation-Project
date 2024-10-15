import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import './SelectPage.css'; // Add any styles you want

const SelectPage = ({ onPageSelect, onClose }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPages = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:4000/api/page/getPages', {
        headers: {
          Authorization: `Bearer ${token}`,
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
  }, []);

  if (loading) return <div>Loading pages...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Select a Page</h2>
        {pages.length > 0 ? (
          <ul>
            {pages.map((page) => (
              <li key={page._id} onClick={() => onPageSelect(page)}>
                <Avatar src={page.pageImage || 'https://cdn-icons-png.flaticon.com/512/1804/1804066.png'} n={24} />
                <span>{page.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pages found.</p>
        )}
      </div>
    </div>
  );
};

export default SelectPage;
