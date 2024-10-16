// Comment.js
import React from 'react';

const Comment = ({ comment, onDelete, onLike, userId }) => {
  const isLiked = comment.likes.includes(userId); // Check if the current user has liked this comment

  return (
    <div className="comment">
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      <div className="comment-actions">
        <button onClick={() => onLike(comment._id)}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span>{comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}</span>
        <button onClick={() => onDelete(comment._id)}>Delete</button>
      </div>
    </div>
  );
};

export default Comment;
