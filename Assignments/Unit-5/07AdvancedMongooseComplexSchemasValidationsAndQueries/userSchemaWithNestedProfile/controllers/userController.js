const User = require("../models/userModel");

//add user
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    next(error);
  }
};

//add profile
exports.addProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.profile.push(req.body);
    await user.save();
    res.status(201).json({ msg: "Profile added", user });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    let users = await User.find();

    if (profile) {
      users = users.filter((user) =>
        user.profiles.some((p) => p.profileName === profile)
      );
    }

    res.json({ count: users.length, users });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { name, profile } = req.query;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const foundProfile = user.profiles.find((p) => p.profileName === profile);

    if (foundProfile) {
      res.json({ user, profile: foundProfile });
    } else {
      res.json({
        message: "User found, but profile not found",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find((p) => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();
    res.json({ message: "Profile updated", profile });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles = user.profiles.filter((p) => p.profileName !== profileName);

    await user.save();
    res.json({ message: "Profile deleted", user });
  } catch (err) {
    next(err);
  }
};
