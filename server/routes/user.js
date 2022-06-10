//localhost:5000/users

import express from 'express';
import { getAllUsers, followUser } from '../controllers/users.js';
import { authenticate } from '../middleware/index.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);
router.patch('/followUser', authenticate, followUser);

export default router;
