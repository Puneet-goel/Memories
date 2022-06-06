import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import mongoose from 'mongoose';
import { forgotURL } from './urls.js';

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.json({ message: 'Invalid username/password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match || email !== user.email) {
      return res.json({ message: 'Invalid email/password' });
    }

    const token = jwt.sign(
      {
        username: username,
        email: email,
      },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({ message: 'ok', token: token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'ok' });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ message: 'Username/Email already exists' });
    }

    return res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, username, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: 'Invalid Username or Link' });
    }

    const user = await User.findById(id).lean();

    if (!user || user.username !== username) {
      return res.json({ message: 'Invalid Username or Link' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgot = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.json({ message: 'Invalid Email' });
    }

    const html = `
            <h3>Hello ${user.username}, </h3>
            <p>Please click on the link below to reset your password for ${email}.</p>
            <p>Reset Link: ${forgotURL + user._id + '/' + user.username}</p>
            <br/>
            <p> If you didn't request this, please ignore this email.</p>
            <p>Thank You</p>
        `;

    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'puneetvideomeet@gmail.com',
        pass: process.env.VMEET_PASS,
      },
    });

    let mailDetails = {
      from: 'no-reply puneetvideomeet@gmail.com',
      to: email,
      subject: 'Password Change',
      html: html,
    };

    await mailTransporter.sendMail(mailDetails);
    return res.status(200).send({ message: 'ok' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const authenticate = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(403);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      email: decoded.email,
      username: decoded.username,
    });
  } catch (err) {
    return res.sendStatus(401);
  }
};
