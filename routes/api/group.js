import { createGroup, displayGroups, joinGroup, displayAllGroups, displaySingleGroup } from '../../controllers/api/group.js'
import express from 'express'

const groupRouter = express.Router()

groupRouter.get('/displayAll', async (req, res) => displayAllGroups(req,res))

groupRouter.get('/display/:email', async (req, res) => displayGroups(req,res))

groupRouter.post('/create', async (req, res) => createGroup(req,res))

groupRouter.post('/join/:email', async (req, res) => joinGroup(req,res))

groupRouter.get('/display/single/:groupCode', async (req, res) => displaySingleGroup(req,res))

export default groupRouter