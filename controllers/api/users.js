import '../../config/database.js'
import { User } from '../../models/user.js'

export async function saveUser(req, res) {
    try {
        const newUser = new User({
          userEmail: req.body.email,
          name: req.body.name,
        });
        await newUser.save();
        res.sendStatus(200);
        console.log("User saved");
    } catch {
        res.sendStatus(500)
        console.log("user not saved")
    }
}

export async function displayAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function displayUsers(req, res) {
    try {
        const { groupId } = req.params;

        const users = await User.find({ groupIds: { $in: [groupId] } })
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

