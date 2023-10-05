import User from '../models/user.model.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const signup=async(req,res,next)=>{
  const {username,email,password} = req.body;
  const hashedPassword =bcryptjs.hashSync(password,10)
  console.log(hashedPassword)
  try {
    
    const newUser=new User({username,email,password:hashedPassword});
    await newUser.save();
    res.status(201).json({msg:"user created successfully"})
  } catch (error) {
    next(error)

  }


}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser)
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log(`password: ${validPassword} and password ${password}`)
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    console.log('here')
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    console.log(`token: ${token}`);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
