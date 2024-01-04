import { setAttendance, displayAttendance } from '../../controllers/api/attendance.js'
import express from 'express'

const attendanceRouter = express.Router()

attendanceRouter.get('/display/:eventId', async (req, res) => displayAttendance(req,res))

attendanceRouter.post('/set/:eventId', async (req, res) => setAttendance(req,res))

export default attendanceRouter