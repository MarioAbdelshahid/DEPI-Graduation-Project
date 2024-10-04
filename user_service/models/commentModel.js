const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;