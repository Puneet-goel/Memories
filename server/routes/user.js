//localhost:5000/users

import express from 'express';
import { getUsers } from '../controllers/users.js';
import { authorize } from '../middleware/index.js';

const router = express.Router();

router.get('/', authorize, getUsers);

export default router;
