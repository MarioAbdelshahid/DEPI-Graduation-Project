import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../Commment/Comment';

const CommentsList = ({ postId, userId }) => { // Accept userId as a prop
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/comment/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/comment/createComments', { content, postID: postId });
      setComments([...comments, response.data.comment]);
      setContent('');
    } catch (error) {
      console.error('Failed to create comment', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/api/comment/deleteCommments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/comment/likeComments/${commentId}/like`);
      setComments(comments.map(comment => (comment._id === commentId ? response.data.comment : comment)));
    } catch (error) {
      console.error('Failed to like/unlike comment', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
      {comments.map(comment => (
        <Comment 
          key={comment._id} 
          comment={comment} 
          onDelete={handleDelete} 
          onLike={handleLike}
          userId={userId} // Pass userId to Comment
        />
      ))}
    </div>
  );
};

export default CommentsList;
