import '../../config/database.js'
import { Chat } from '../../models/chat.js'
import { User } from '../../models/user.js';

export async function displayAllChats (req, res) {
    try {
        const { eventId } = req.params;

        const chats = await Chat.find({ eventId });
        res.status(200).json(chats)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export async function createMessage (req, res) {
    try {
        const { eventId, userId } = req.params;

        // Fetch user's name based on user ID
        const user = await User.findById(userId);

        const chat = new Chat({
            userId: userId,
            userName: user.name,
            eventId: eventId,
            message: req.body.message
        })
        await chat.save()
        res.json(chat)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
