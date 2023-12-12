import { createGroup, displayGroups, joinGroup } from '../../controllers/api/group.js'
import express from 'express'

const groupRouter = express.Router()

groupRouter.get('/display', async (req, res) => displayGroups(req,res))

groupRouter.post('/create', async (req, res) => createGroup(req,res))

groupRouter.post('/join/:userId', async (req, res) => joinGroup(req,res))

export default groupRouter