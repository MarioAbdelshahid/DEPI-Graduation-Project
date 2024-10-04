const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
