import express from 'express';
//import { signin } from '../controlers/auth.controller.js';
const router=express.Router();
import { signup,signin } from '../controlers/auth.controller.js';
router.post('/signup', signup)
router.post("/signin", signin);
export default router;
