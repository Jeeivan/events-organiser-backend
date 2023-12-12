import { displayUsers, saveUser } from "../../controllers/api/users.js";
import express from 'express'

const userRouter = express.Router()

userRouter.post('/new', async (req,res) => saveUser(req,res))
userRouter.get('/display', async (req,res) => displayUsers(req,res))

export default userRouter

