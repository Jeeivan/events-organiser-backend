import '../../config/database.js'
import { Group } from "../../models/group.js";
import { User } from '../../models/user.js';

export async function displayAllGroups(req, res) {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function displayGroups(req, res) {
    try {
        const { email } = req.params;

        // Find the user by email
        const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Retrieve the group IDs associated with the user
      const groupIds = user.groupIds;
  
      // Find the groups using the retrieved group IDs
      const groups = await Group.find({ _id: { $in: groupIds } });
  
      res.status(200).json(groups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

export async function createGroup (req, res) {
    try {
        let generatedCode;
        let existingGroup = true;

        while (existingGroup) {
            // Generate a 4-digit code
            generatedCode = Math.floor(1000 + Math.random() * 9000);

            // Check if a group with the generated code already exists
            existingGroup = await Group.findOne({ code: generatedCode });
        }

        // Create a new Group instance with the unique generated code
        const group = new Group({
            name: req.body.name,
            code: generatedCode,
        });

        // Save the new group to the database
        await group.save();

        // Return the created group in the response
        res.json(group);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function joinGroup(req, res) {
    try {
        const { email } = req.params;
        const { groupCode } = req.body;

        // Check if the user exists based on the provided email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the group exists
        const group = await Group.findOne({ code: groupCode });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Update the user with the groupId
        await User.findByIdAndUpdate(user._id, {
            $addToSet: { groupIds: group._id },
        });

        res.json({ message: "User joined the group successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
}