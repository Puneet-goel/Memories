import User from '../models/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select({ username: 1, email: 1 }).lean();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
