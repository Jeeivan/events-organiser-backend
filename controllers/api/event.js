import '../../config/database.js'
import { Event } from '../../models/event.js'

export async function createEvent (req, res) {
    try {

        const { groupId } = req.params;

        // Create Event
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            groupId: groupId, // referencing the group ID
        })
        await event.save()
        res.json(event)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function displayAllEvents(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function displayEvents(req, res) {
    try {
        const { groupId } = req.params;

        // Find events specific to the group
        const events = await Event.find({ groupId: groupId });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}