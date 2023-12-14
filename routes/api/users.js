import { displayAllUsers, displayUsers, login, register, saveUser } from "../../controllers/api/users.js";
import express from 'express'

const userRouter = express.Router()

userRouter.post('/new', async (req,res) => saveUser(req,res))

userRouter.post('/register', async (req,res) => register(req,res))

userRouter.post('/login', async (req,res) => login(req,res))

userRouter.get('/displayAll', async (req,res) => displayAllUsers(req,res))

userRouter.get('/display/:groupId', async (req,res) => displayUsers(req,res))

export default userRouter

