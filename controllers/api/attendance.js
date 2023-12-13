import '../../config/database.js'
import { Attendance } from '../../models/attendance.js'

export async function displayAttendance(req, res) {
    try {
        const { eventId } = req.params;

        // Retrieve all attendance records for the specified event
        const attendance = await Attendance.find({ eventId });

        res.status(200).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function setAttendance(req, res) {
    try {
        const { eventId, userId } = req.params;

        // Check if attendance record already exists
        const existingAttendance = await Attendance.findOne({ userId, eventId });

        if (existingAttendance) {
            // If the record exists, update it
            existingAttendance.going = req.body.going;
            await existingAttendance.save();
            res.json(existingAttendance);
        } else {
            // If the record doesn't exist, create a new one
            const attendance = new Attendance({
                userId: userId,
                eventId: eventId,
                going: req.body.going
            });

            await attendance.save();
            res.json(attendance);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}