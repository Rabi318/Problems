const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

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
