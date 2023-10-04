import express from 'express'
import { userCont } from '../controlers/user.controller.js'
//const app = express()
const router = express.Router()
router.get('/test',userCont)

export default router