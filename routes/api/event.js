import { displayEvents, displayAllEvents, createEvent } from '../../controllers/api/event.js'
import express from 'express'

const eventRouter = express.Router()

eventRouter.get('/displayAll', async (req, res) => displayAllEvents(req,res))

eventRouter.get('/display/:groupId', async (req, res) => displayEvents(req,res))

eventRouter.post('/create/:groupId', async (req, res) => createEvent(req,res))

export default eventRouter