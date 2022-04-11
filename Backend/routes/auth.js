const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// REGISTER

router.post("/register", async (req, res) => {
  try {
    // GENERATE NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // GENERATE NEW USER
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // SAVE USER AND RETURN RESPONSE
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("Wrong Email or Password");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("Wrong Email or Password");
    } else {
      res.status(200).json(user);
    }
    // !user && res.status(404).send("User not found")
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
