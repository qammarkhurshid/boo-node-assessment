const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    title: String,
    description: String,
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    commentedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    personalityVote: String, // Should be a separate collection in production and ids of personality type should be saved instead of string
    replies: [], // For Future
    likes: Number,
  },
  { timestamps: true }
);

// Create the model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
