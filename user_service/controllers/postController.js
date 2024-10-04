const Post = require('../models/postModel');
const Page = require('../models/pageModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { header, content } = req.body;

    const post = new Post({
      header,
      content: content ? {
        text: content.text,
        image: content.image,
        video: content.video
      } : null,
      postedBy: req.user.id,
      page: req.body.pageId ? req.body.pageId : null
    });

    // Save post
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(req.user.id);
    const page = await Page.findById(post.page);

    // Check if the user is authorized to delete the post
    if (user.isAdmin || post.postedBy.toString() === req.user.id || (page && page.createdBy.toString() === req.user.id)) {

      // Delete all the comments
      await Comment.deleteMany({ post: post._id });

      // Delete the post
      await post.remove();
      return res.json({ message: 'Post deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Like/Unlike a post
exports.postLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(userId)) {

      // If user didn't like the post, like it

      post.likes.push(userId);
      await post.save();
      return res.json({ message: 'Post liked', post });
    } else {

      // If user did like the post, unlike it

      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      return res.json({ message: 'Post unliked', post });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error: Failed to like post' });
  }
};
