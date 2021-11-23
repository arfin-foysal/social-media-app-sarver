const UserRouter = require('express').Router()
const bcrypt =require('bcrypt')
const User = require('../models/Users')
//update user
UserRouter.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                req.body.password= await bcrypt.hash(req.body.password, 10)
            } catch (err){
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Account has been Updated")
        } catch (error) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can update only your account")
    }
})
// delete user
// get a user
// follow a user
// unfollow a user


module.exports=UserRouter