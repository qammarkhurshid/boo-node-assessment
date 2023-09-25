const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    id: Number,
    name: { type: String, required: true },
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    image: {
      type: String,
      default: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7911322/avatar-icon-sm.png',
    },
  },
  { timestamps: true }
);

// Create the model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
