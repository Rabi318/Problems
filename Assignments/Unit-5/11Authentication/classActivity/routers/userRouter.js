const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ msg: "Internal Server Error" });
      } else {
        // console.log(password, hash)
        //store this pass in to db along with other data
        const user = await User.create({
          username,
          email,
          password: hash,
          role,
        });
        res.status(201).json({ msg: "User Created", user });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const { username, email, _id, role } = user;
          //generate jwt token
          const accessToken = jwt.sign(
            { userId: _id, role },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          const refreshToken = jwt.sign(
            { userId: _id, role },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({
            msg: "Login Success",
            user: { username, email },
            accessToken,
            refreshToken,
          });
        } else {
          res.status(401).json({ msg: "Invalid Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//github oAuth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.envGITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      // console.log(profile);
      return done(null, profile);
    }
  )
);

//calls github login
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    // console.log(req.user.id)
    const githubUserId = req.user.id;
    const user = await User.findOne({ profileId: githubUserId });
    if (!user) {
      //store db in the userid
      let newUser = await User.create({ profileId: githubUserId });
      //generate token
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.json({ msg: "Login Success", token });
    } else {
      //generate token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.json({ msg: "Login Success", token });
    }
    // Successful authentication, redirect home.
    // res.redirect('/');
    // res.json({ msg: "Login Success" });
  }
);

module.exports = router;
