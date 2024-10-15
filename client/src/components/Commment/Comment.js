import React from 'react';

const Comment = ({ comment, onDelete, onLike, userId }) => {
  return (
    <div className="comment">
      <p>{comment.content}</p>
      <button onClick={() => onLike(comment._id)}>Like</button>
      {comment.createdBy === userId && (
        <button onClick={() => onDelete(comment._id)}>Delete</button>
      )}
    </div>
  );
};

export default Comment;
