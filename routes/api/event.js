import { displayAllEvents, createEvent, displayEventsByCode, displayEventsById } from '../../controllers/api/event.js'
import express from 'express'

const eventRouter = express.Router()

eventRouter.get('/displayAll', async (req, res) => displayAllEvents(req,res))

eventRouter.get('/display/:groupCode', async (req, res) => displayEventsByCode(req,res))

eventRouter.get('/display/single/:eventId', async (req, res) => displayEventsById(req,res))

eventRouter.post('/create/:groupId', async (req, res) => createEvent(req,res))

export default eventRouter