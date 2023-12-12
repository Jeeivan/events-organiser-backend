import '../../config/database.js'
import { User } from '../../models/user.js'

export async function saveUser(req, res) {
    if ((await User.count({ userEmail: req.body.email })) === 0) {
        const newuser = new User({
          userEmail: req.body.email,
          name: req.body.name,
        });
        newuser.save().then(() => {
          res.sendStatus(200);
          console.log("user saved")
        });
    } else {
        res.sendStatus(500)
        console.log("user not saved")
    }
}