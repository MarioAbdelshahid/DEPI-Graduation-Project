const Comment = require('../models/commentModel');
const Page = require('../models/pageModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, postID } = req.body;

    // Check if post exists
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content,
      createdBy: req.user.id,
      post: postID
    });

    // Save comment
    await comment.save();
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};


// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params.commentID;
    const comment = await Comment.findById(commentID).populate('post'); // Populating the post field to access its details
    const user = await User.findById(req.user.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Find the post and the page associated with the comment
    const post = await Post.findById(comment.post._id).populate('page');
    const page = post.page ? await Page.findById(post.page) : null;

    // Check if the user is authorized to delete the post
    if (user.isAdmin || page && page.createdBy.toString() === req.user.id || post.createdBy.toString() === req.user.id || comment.createdBy.toString() === req.user.id) {
      await Comment.findByIdAndDelete(commentID);
      return res.status(200).json({ message: 'Comment deleted succesfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Like/Unlike a comment
exports.commentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentID);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const userId = req.user.id;

    if (!comment.likes.includes(userId)) {

      // If the user has not liked the comment, like it

      comment.likes.push(userId);
      await comment.save();
      return res.json({ message: 'Comment liked', comment });
    } else {

      // If the user has already liked the comment, unlike it

      comment.likes = comment.likes.filter(id => id.toString() !== userId);
      await comment.save();
      return res.json({ message: 'Comment unliked', comment });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error: Failed to like/unlike comment' });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postID } = req.params;
    const comments = await Comment.find({ post: postID }).populate('createdBy', 'name'); // Populate user data

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};
