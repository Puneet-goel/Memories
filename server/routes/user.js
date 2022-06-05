//localhost:5000/users

import express from 'express';
import { getUsers } from '../controllers/users.js';
import { authorize } from '../controllers/auth.js';

const router = express.Router();

router.get('/', authorize, getUsers);

export default router;
