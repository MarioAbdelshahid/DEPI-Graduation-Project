const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
  video: { type: String } 
}, { _id: false });


const postSchema = new mongoose.Schema({
  header: { type: String, required: false },
  content: {
    type: contentSchema,
    required: function() {
      return !this.header;
    }
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: false},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

postSchema.path('header').validate(function(header) {
  return header || this.content;
}, "Post can't be empty.");

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
