import '../../config/database.js'
import { Event } from '../../models/event.js'
import { Group } from '../../models/group.js';

export async function createEvent (req, res) {
    try {

        const { groupId } = req.params;

        // Create Event
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
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

export async function displayEventsByCode(req, res) {
    try {
        const { groupCode } = req.params;

        // Find the group by code
        const group = await Group.findOne({ code: groupCode });

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Find events specific to the group
        const events = await Event.find({ groupId: group._id });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function displayEventsById(req, res) {
    try {
        const { eventId } = req.params;

        // Find events specific to the group using the correct field (_id)
        const events = await Event.findById(eventId);

        if (events.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
