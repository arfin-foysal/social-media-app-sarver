const authRouter = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

//Resister user
authRouter.post("/register", async (req, res) => {
  try {
    //Hash pasword
    const hashPssword = await bcrypt.hash(req.body.password, 10);
    //create user
    const newUser = new User({
      username: req.body.email,
      email: req.body.email,
      password: hashPssword,
    });
    //response send
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
});

// login user
authRouter.post("/login",async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found")
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        !validPassword && res.status(404).json("worng password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = authRouter;
