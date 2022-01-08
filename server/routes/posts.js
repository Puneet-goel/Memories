//localhost:5000/posts

import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost, getSpecificPost } from "../controllers/posts.js";
import { authorize } from "../controllers/auth.js";

const router = express.Router();

router.get('/', authorize, getPosts);
router.get('/:id', getSpecificPost);
router.post('/', authorize, createPost);
router.patch('/:id', authorize,  updatePost);
router.delete('/:id', authorize, deletePost);
router.patch('/:id/likePost', authorize, likePost);

export default router;