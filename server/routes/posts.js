//localhost:5000/posts

import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getUserPost,
} from '../controllers/posts.js';
import { upload, authorize } from '../middleware/index.js';

const router = express.Router();

router.get('/', authorize, getPosts);
router.get('/:id', getUserPost);
router.post('/', upload.single('selectedFile'), authorize, createPost);
router.patch('/:id', authorize, updatePost);
router.delete('/:id', authorize, deletePost);
router.patch('/:id/likePost', authorize, likePost);

export default router;
