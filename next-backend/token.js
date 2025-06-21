import pkg from 'jsonwebtoken';
const { sign } = pkg;


const generatetoken = (user) => {
  return sign(
    { id: user._id, isAdmin: user.isAdmin, email: user.email, name: user.name},
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  )
}

export const generateToken = generatetoken