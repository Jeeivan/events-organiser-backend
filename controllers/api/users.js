import '../../config/database.js'
import { User } from '../../models/user.js'
import bcrypt from "bcryptjs";

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

export async function register(req, res) {
    try {
        const {name, email, password} = req.body

        const encryptedPassword = await bcrypt.hash(password, 10)

        const existingUser = await User.findOne({ email:email })

        if (existingUser) {
            return res.status(409).json("Email already exists");
        }

        const newUser = new User({
            name: name,
            email: email,
            password: encryptedPassword
        });
        await newUser.save()
        res.sendStatus(200)
        console.log("User saved");
    }   catch {
        res.sendStatus(500)
        console.log("User not saved");
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body

        // Check if the user exists based on the provided email
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // Check if the provided password matches the stored password
            if (existingUser.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("Incorrect password");
            }
        } else {
            // If the user does not exist, return a 404 status
            res.status(404).json("User not found");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json("Internal Server Error");
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

