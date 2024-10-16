const Post = require('../models/postModel');
const Page = require('../models/pageModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')


// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { header, content, pageId } = req.body;

    const post = new Post({
      header,
      content: content ? {
        text: content.text,
        image: content.image,
        video: content.video
      } : null,
      postedBy: req.user.id,
      page: pageId ? pageId : null 
    });


    // Save post
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post, id: post._id });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postID;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is authorized to delete the post
    if (post.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Server error: Failed to delete post' });
  }
};





// Like/Unlike a post
exports.postLike = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID
    const post = await Post.findById(req.params.postID).populate('likes', 'name profilePicture'); // Populate likes to get user details

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (!post.likes.some(like => like._id.toString() === userId)) {
      // If user didn't like the post, like it
      post.likes.push(userId);
      await post.save();
      await post.populate('likes', 'name profilePicture'); // Re-populate likes after saving
      return res.json({ message: 'Post liked', post });
    } else {
      // If user did like the post, unlike it
      post.likes = post.likes.filter(like => like._id.toString() !== userId);
      await post.save();
      await post.populate('likes', 'name profilePicture'); // Re-populate likes after saving
      return res.json({ message: 'Post unliked', post });
    }
  } catch (error) {
    console.error('Error liking post:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error: Failed to like post' });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('postedBy', 'name profilePicture'); // Populate user data (name and profile picture)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};




exports.getPostsByPage = async (req, res) => {
  try {
    const posts = await Post.find({ page: req.params.pageID }).populate('postedBy', 'name profilePicture'); // Populate user data (name and profile picture)
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};




exports.getPostsByUser = async (req, res) => {
  const { userID } = req.params;

  try {
    // Populate the 'postedBy' field with the 'name' and 'profilePicture' of the user
    const posts = await Post.find({ postedBy: userID }).populate('postedBy', 'name profilePicture');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};
