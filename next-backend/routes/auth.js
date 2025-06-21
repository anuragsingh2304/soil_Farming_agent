import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import cookie from "cookie"
import { generateToken } from '../token.js';
import logger from '../logger.js';
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
        logger.warn(`Loggin attempted but user not found for ${email}`)
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.warn(`Loggin attempted with Invalid password for ${email}`)
        return res.status(400).json({ message: 'Invalid Password' });
      }
      const tokenName = 'authToken';
      const tokenValue = generateToken(user);
      const cookieOptions = {
        httpOnly: true,
        secure: true, 
        sameSite: 'none', 
        maxAge: 60 * 60 * 24 * 2, // tokkens age is 2 days
        path: "/"
      };

      res.setHeader('Set-Cookie', cookie.serialize(tokenName, tokenValue, cookieOptions));


      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
      if(user.isAdmin) {
        logger.info(`Admin login successful for ${email}`)
      }else {
        logger.info(`User login successful ${email}`)
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });



// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      info.warn(`Registration Failed: User already exists for ${email}`)
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    logger.info(`User registered Successfully with ${email}`)
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server error' });
    logger.error(`Error: user registration failed for ${req.body}`)
  }
});

router.get("/logout", (req, res)=> {
    const token = req.cookies.authToken;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.isAdmin) {
      logger.info(`Admin Logout successful for ${decoded.email}`)
    } else {
      logger.info(`User Logout successful for ${decoded.email}`)
    }
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

    if (!token){
      logger.warn(`tokken not found user Authentication Failed`)
      return res.status(401).json({ message: "Not authenticated" });}

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ userId: decoded.id, isAdmin: decoded.isAdmin, name: decoded.name, email: decoded.email});
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
})

export default router;