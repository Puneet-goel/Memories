import PostMessage from '../models/postMessage.js';

export const fixAllPost = async (req, res) => {
  try {
    let postMessages = await PostMessage.find().lean();

    for (let i = 0; i < postMessages.length; i++) {
      const curIndex = postMessages[i]._id;
      let post = await PostMessage.findById(curIndex).lean();

      post.createdAt = new Date(post.createdAt);
      post.selectedFile = {
        url: '',
        imageId: '',
        sanityId: '',
      };

      await PostMessage.findByIdAndUpdate(curIndex, {
        ...post,
        curIndex,
      }).lean();
    }

    postMessages = await PostMessage.find().lean();
    return res.status(201).json(postMessages);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
