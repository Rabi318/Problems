const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const nodemailer = require("nodemailer");
const BlacklistToken = require("../models/blacklistTokemModel");

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

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
//sending emails
router.get("/send-email", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"rabinarayan" <rabinarayan@gmail.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });
    res.status(201).json({ msg: "Email Sent", info });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//forget password
router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 120,
    });
    let resetPasswordLink = `http://localhost:3000/users/reset-password?token=${token}`;
    res.json({
      msg: "Password Reset Link send to Registered Email",
      link: resetPasswordLink,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    res.json({ msg: token });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) return res.status(404).json({ msg: "User Not Found" });
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      //blacklist the token to prevent reuse
      await BlacklistToken.create({ toekn: token });
      res.status(201).json({ msg: "Password Reset Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
