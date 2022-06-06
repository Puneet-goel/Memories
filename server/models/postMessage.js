import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: {
    type: [String],
    default: [],
  },
  likedBy: {
    type: [String],
    default: [],
  },
  selectedFile: {
    url: {
      type: String,
    },
    imageId: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
