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
        const { eventId } = req.params;
        const { email } = req.body

        // Fetch user's name based on user email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        const chat = new Chat({
            email: email,
            userName: user.name,
            eventId: eventId,
            message: req.body.message
        })
        await chat.save()
        res.json(chat)
    } catch (err) {
        console.error('Error creating message:', err);
        res.status(500).send(err.message)
    }
}
