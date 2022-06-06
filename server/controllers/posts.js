import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';


// import functions from "../sanity/apiCalls.js";
// const {
//   getPostImage,
//   updatePostImage,
//   deletePostImage,
//   getAllPostImages  
// } = functions;

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
      .select({ selectedFile: 0 })
      .lean();

    return res.status(200).json(postMessages);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    // let post = req.body.post;
    // post['creator'] = req.body.username;
    console.log(req.body); 
    return res.status(200);

    const newPost = new PostMessage(post);

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body.post;
    const username = req.body.username;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No post with that id');
    }

    const oldPost = await PostMessage.findById(_id)
      .select({ creator: 1 })
      .lean();

    if (oldPost.creator !== username) {
      return res.status(401).send('Not authorized');
    }

    await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true },
    ).lean();

    return res.status(204).json({ message: 'Post updated' });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const username = req.body.username;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No post with that id');
    }

    const oldPost = await PostMessage.findById(_id)
      .select({ creator: 1 })
      .lean();

    if (oldPost.creator !== username) {
      return res.status(401).send('Not authorized');
    }

    await PostMessage.findByIdAndRemove(_id).lean();

    return res.status(204).json({ message: 'Post Deleted successfully!!' });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const username = req.body.username;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No post with that id');
    }

    let post = await PostMessage.findById(_id).select({ likedBy: 1 }).lean();

    const index = post.likedBy.indexOf(username);

    if (index >= 0) {
      post.likedBy.splice(index, 1);
    } else {
      post.likedBy.push(username);
    }

    const updatePost = await PostMessage.findByIdAndUpdate(
      _id,
      { likedBy: post.likedBy },
      { new: true },
    )
      .select({ likedBy: 1 })
      .lean();

    return res.status(200).json(updatePost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(_id).lean();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
