import React from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../components/Posts/Posts';
import './styles/PageDetails.css';

const PageDetails = () => {
  const { pageId } = useParams(); 

  // Log the value of pageId to the terminal
  console.log('Page ID:', pageId); // This will log the pageId to the terminal

  return (
    <div className="page-details-container">
      <h1>Page Details</h1>
      <p>This page displays the details of the selected page and its posts.</p>
      
      <Posts pageSpecific={pageId} />
    </div>
  );
};

export default PageDetails;
