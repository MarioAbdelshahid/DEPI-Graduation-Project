import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Avatar from '../Avatar/Avatar'; // Ensure you have the Avatar component imported
import './Comment.css'

const Comment = ({ comment, userId, onDelete, onLike }) => {
  const isLiked = comment.likes.includes(userId); // Check if the current user has liked this comment

  // Default avatar URL
  const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URjWpcZfPfzAHxrU_Xms2GzfUJmvWXGjuw&s';

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-user-info">
          <Avatar 
            src={comment.createdBy.profilePicture || defaultAvatar} 
            n={40} // Adjust the size as needed
          />
          <span className="comment-user-name">{comment.createdBy.name || 'Unknown User'}</span>
          <div className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      <div className="comment-actions">
        <button onClick={() => onLike(comment._id)} className="like-button">
          <FontAwesomeIcon
            icon={isLiked ? solidHeart : regularHeart}
            style={{ color: isLiked ? 'red' : 'black' }} // Set color based on like status
          />
        </button>
        <span>
          {comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}
        </span>
        <button onClick={() => onDelete(comment._id)} className="delete-comment-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
