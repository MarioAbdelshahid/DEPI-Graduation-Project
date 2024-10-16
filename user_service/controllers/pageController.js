const Comment = require('../models/commentModel');
const Page = require('../models/pageModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')


// In your page controller
exports.createPage = async (req, res) => {
  try {
    const { name, description } = req.body;

    const page = new Page({
      name,
      description,
      createdBy: req.user.id,
    });

    // Save page
    await page.save();

    // Update user's created page collection
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdPages: page._id }
    });

    return res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page' });
  }
};


exports.deletePage = async (req, res) => {
  try {
    const pageID = req.params.pageID;
    const page = await Page.findById(pageID);
    const user = await User.findById(req.user.id);

    if (!page) { 
      return res.status(404).json({ message: 'Page not found' }); 
    }

    // Check if the user is authorized to delete the page
    if (user.isAdmin || page.createdBy.toString() === user.id) {
      // Find all posts related to this page
      const posts = await Post.find({ page: pageID });

      // Delete all comments related to each post in the page
      for (const post of posts) {
        const comments = await Comment.find({ post: post._id }); // Fetch comments to log before deletion
        for (const comment of comments) {
          console.log(`Deleting comment: ${comment._id} from post: ${post._id}`);
        }
        await Comment.deleteMany({ post: post._id });
        console.log(`Deleted all comments from post: ${post._id}`);
      }

      // Delete all posts related to the page
      for (const post of posts) {
        console.log(`Deleting post: ${post._id}`);
      }
      await Post.deleteMany({ page: pageID });
      console.log(`Deleted all posts from page: ${pageID}`);

      // Delete the page
      await Page.findByIdAndDelete(pageID);
      console.log(`Deleted page: ${pageID}`);

      // Delete the page ID from the user's createdPages
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { createdPages: pageID }
      });

      return res.status(200).json({ message: 'Page deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized to delete this page' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// In your page controller
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find().populate('createdBy', 'name'); // Populate the createdBy field with the user's name
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load pages' });
  }
};

