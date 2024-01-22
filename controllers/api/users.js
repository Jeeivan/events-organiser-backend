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

function isValidEmail(email) {
    const allowedDomains = ['gmail.com', 'outlook.com', 'ymail.com', 'yahoo.com', 'googlemail.com']
    const [, domain] = email.split('@')
    return allowedDomains.includes(domain.toLowerCase())
}

export async function register(req, res) {
    try {
        const {name, email, password} = req.body

        if (!email.includes('@') || !isValidEmail(email)) {
            return res.status(400).json("Invalid email format or domain")
        }

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
            // Comparing provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            // Check if the provided password matches the stored password
            if (isPasswordValid) {
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

export async function leaveGroup(req, res) {
    const { email, groupId } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findOne({ email:email })
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is a member of the group
      const isMember = user.groupIds.includes(groupId);
  
      // If the user is not a member, return an error
      if (!isMember) {
        return res.status(400).json({ message: 'User is not a member of the group' });
      }
  
      // Remove the group ID from the user's groupIds array
      user.groupIds = user.groupIds.filter((id) => id.toString() !== groupId);
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({ message: 'User successfully left the group' });
    } catch (error) {
      console.error('Error leaving group:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };