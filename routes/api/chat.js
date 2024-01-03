import { createMessage, displayAllChats } from '../../controllers/api/chat.js'
import express from 'express'

const chatRouter = express.Router()

chatRouter.get('/display/:eventId', async (req, res) => displayAllChats(req,res))

chatRouter.post('/create/:eventId', async (req, res) => createMessage(req,res))

export default chatRouter