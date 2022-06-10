import User from '../models/user.js';
import mongoose from 'mongoose';
import {
  createUserImage,
  deleteUserImage,
  updateUserImage,
  getSpecificUserImage,
} from '../sanity/apiUserImage.js';
import fs from 'fs';
import { promisify } from 'util';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 }).lean();

    return res.status(200).json({
      message: 'ok',
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const whomToFollow = req.body.whomToFollow;
    const id = req.body.id;

    let user = await User.findById(id).select({ following: 1 }).lean();

    const index = user.following.indexOf(whomToFollow);

    if (index >= 0) {
      user.following.splice(index, 1);
    } else {
      user.following.push(whomToFollow);
    }

    await User.findByIdAndUpdate(_id, { following: user.following })
      .select({ _id: 1 })
      .lean();

    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
