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
    const { whomToFollow, id } = req.body;
    const _id = mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    let user = await User.findById(_id).select({ following: 1 }).lean();

    const index = user.following.indexOf(whomToFollow);

    if (index >= 0) {
      user.following.splice(index, 1);
    } else {
      user.following.push(whomToFollow);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { following: user.following },
      { new: true },
    )
      .select({ following: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
