import '../../config/database.js'
import { Attendance } from '../../models/attendance.js'
import { User } from '../../models/user.js';

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

export async function displayAttendanceByUser(req, res) {
    try {
        const { email } = req.params;

        // Retrieve all attendance records for the specified event
        const attendance = await Attendance.find({ email });

        res.status(200).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function setAttendance(req, res) {
    try {
        const { eventId } = req.params;
        const { email } = req.body

        // Check if attendance record already exists
        const existingAttendance = await Attendance.findOne({ email, eventId });
        const user = await User.findOne({ email: email });

        if (existingAttendance) {
            // If the record exists, update it
            existingAttendance.going = req.body.going;
            await existingAttendance.save();
            res.json(existingAttendance);
        } else {
            // If the record doesn't exist, create a new one
            const attendance = new Attendance({
                email: email,
                userName: user.name,
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