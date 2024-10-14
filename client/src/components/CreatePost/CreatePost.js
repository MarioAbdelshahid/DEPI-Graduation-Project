// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreatePost.css';

// const CreatePost = ({ refreshPosts }) => {
//   const [postTitle, setPostTitle] = useState('');
//   const [file, setFile] = useState(null); // For file upload (image or video)
//   const [contentType, setContentType] = useState('text'); // Track content type (text, image, video)
//   const [textContent, setTextContent] = useState(''); // For text content
//   const [error, setError] = useState('');

//   // File input change handler
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('User not authenticated');
//       return;
//     }

//     const formData = new FormData(); // To handle file upload
//     formData.append('header', postTitle);
//     formData.append('contentType', contentType);
    
//     if (contentType === 'text') {
//       formData.append('text', textContent);
//     } else {
//       formData.append('file', file); // Attach the file for image or video
//     }

//     try {
//       const response = await axios.post('http://localhost:4000/api/post/createPost', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Clear inputs after submission
//       setPostTitle('');
//       setFile(null);
//       setTextContent('');
//       refreshPosts(); // Refresh post list
//     } catch (err) {
//       setError('Failed to create post');
//     }
//   };

//   return (
//     <div className="create-post-container">
//       <h2>Create a Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Post Title"
//           value={postTitle}
//           onChange={(e) => setPostTitle(e.target.value)}
//           required
//         />

//         <div className="content-type-selector">
//           <button
//             type="button"
//             className={contentType === 'text' ? 'active' : ''}
//             onClick={() => setContentType('text')}
//           >
//             Text
//           </button>
//           <button
//             type="button"
//             className={contentType === 'image' ? 'active' : ''}
//             onClick={() => setContentType('image')}
//           >
//             Image
//           </button>
//           <button
//             type="button"
//             className={contentType === 'video' ? 'active' : ''}
//             onClick={() => setContentType('video')}
//           >
//             Video
//           </button>
//         </div>

//         {contentType === 'text' && (
//           <textarea
//             placeholder="Enter text content"
//             value={textContent}
//             onChange={(e) => setTextContent(e.target.value)}
//             required
//           />
//         )}

//         {(contentType === 'image' || contentType === 'video') && (
//           <input
//             type="file"
//             accept={contentType === 'image' ? 'image/*' : 'video/*'}
//             onChange={handleFileChange}
//             required
//           />
//         )}

//         <button type="submit">Create Post</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = ({ refreshPosts }) => {
  const [postTitle, setPostTitle] = useState('');
  const [file, setFile] = useState(null); // For file upload (image or video)
  const [contentType, setContentType] = useState('text'); // Track content type (text, image, video)
  const [textContent, setTextContent] = useState(''); // For text content
  const [error, setError] = useState('');
  
  // Search state
  const [pages, setPages] = useState([]); // Store pages
  const [filteredPages, setFilteredPages] = useState([]); // Store filtered pages
  const [searchTerm, setSearchTerm] = useState(''); // Store search term
  const [selectedPage, setSelectedPage] = useState(null); // Track selected page

  // Fetch pages on component mount
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pages'); // Replace with your API endpoint
        setPages(response.data);
        setFilteredPages(response.data); // Set all pages as initial filtered pages
      } catch (err) {
        console.error('Failed to fetch pages', err);
      }
    };

    fetchPages();
  }, []);

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

    // Include selected page in form data
    if (selectedPage) {
      formData.append('pageId', selectedPage.id); // Assuming the page object has an id
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
      setSelectedPage(null); // Clear selected page
      refreshPosts(); // Refresh post list
    } catch (err) {
      setError('Failed to create post');
    }
  };

  // Handle search term change
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredPages(
      pages.filter((page) =>
        page.name.toLowerCase().includes(value.toLowerCase()) // Assuming pages have a name property
      )
    );
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setSearchTerm(''); // Clear search term on selection
    setFilteredPages(pages); // Reset filtered pages
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

        {/* Search for pages */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for pages"
            value={searchTerm}
            onChange={handleSearch} // Call handleSearch on change
            className="search-input"
          />
          {filteredPages.length > 0 && (
            <div className="search-results">
              {filteredPages.map((page) => (
                <div key={page.id} className="search-item" onClick={() => handlePageSelect(page)}>
                  {page.name} {/* Adjust this according to your page object structure */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display selected page */}
        {selectedPage && <p>Selected Page: {selectedPage.name}</p>}

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
