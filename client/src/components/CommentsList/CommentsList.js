import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../Commment/Comment';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
  const token = localStorage.getItem('token'); // Fetch token from localStorage

  // Function to fetch comments from the server
  const fetchComments = async () => {
    if (!postId) {
      console.error('Post ID is required');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:4000/api/comment/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      console.error('Comment content cannot be empty');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:4000/api/comment/createComments',
        { content, postID: postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setContent('');
    } catch (error) {
      console.error('Failed to create comment', error);
    }
  };

  // Function to handle comment deletion
  const handleDelete = async (commentId) => {
    console.log('Deleting comment', commentId);
    try {
      await axios.delete(`http://localhost:4000/api/comment/deleteCommments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  // Function to handle liking/unliking comments
  const handleLike = async (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment._id === commentId) {
        // Optimistically update the comment in the UI
        const liked = comment.likes.includes(userId);
        return {
          ...comment,
          likes: liked ? comment.likes.filter(id => id !== userId) : [...comment.likes, userId],
        };
      }
      return comment;
    });

    // Update the UI optimistically
    setComments(updatedComments);

    try {
      // Make the API call to like/unlike the comment
      const response = await axios.post(
        `http://localhost:4000/api/comment/likeComments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the comment based on server response
      setComments(comments.map(comment => (comment._id === commentId ? response.data.comment : comment)));
    } catch (error) {
      console.error('Failed to like/unlike comment', error);
      // Optionally revert optimistic update if there's an error
      setComments(comments);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
      {comments.length > 0 ? (
        comments.map(comment => (
          <Comment 
            key={comment._id} 
            comment={comment} 
            onDelete={handleDelete} 
            onLike={handleLike}
            userId={userId} // Pass userId to Comment
          />
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentsList;
