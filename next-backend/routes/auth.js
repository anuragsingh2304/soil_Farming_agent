import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import cookie from "cookie"
import { generateToken } from '../token.js';
import jwt from "jsonwebtoken";
const router = express.Router();



// POST /api/login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const tokenName = 'authToken';
      const tokenValue = generateToken(user);
      const cookieOptions = {
        httpOnly: true,
        secure: true, 
        sameSite: 'none', 
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: "/"
      };

      res.setHeader('Set-Cookie', cookie.serialize(tokenName, tokenValue, cookieOptions));

      // If credentials are correct, send success response
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error('Login Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });



// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/logout", (req, res)=> {
    res.setHeader("Set-Cookie", cookie.serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/"
  }));
})

router.get("/user", (req, res)=> {
  try {
    const token = req.cookies.authToken;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ userId: decoded.id, isAdmin: decoded.isAdmin, name: decoded.name, email: decoded.email});
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
})

export default router;