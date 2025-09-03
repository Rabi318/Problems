const Note = require("../models/Note");
const User = require("../models/User");
const mongoose = require("mongoose");

const isOwnerOrAdmin = (note, user) => {
  if (!note) return false;
  if (user.role === "admin") return true;
  return note.owner.toString() === user._id.toString();
};

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ msg: "Title is required" });
    const note = new Note({ title, description, owner: req.user._id });
    await note.save();
    res.status(201).json({ msg: "Note created", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.listNotes = async (req, res) => {
  try {
    const { search = "", type = "all" } = req.query;
    const titleFilter = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    let q = {};
    if (type === "my") {
      q = { owner: req.user._id, ...titleFilter };
    } else if (type === "shared") {
      q = { sharedWith: req.user._id, ...titleFilter };
    } else {
      q = {
        $or: [{ owner: req.user._id }, { sharedWith: req.user._id }],
        ...titleFilter,
      };
    }

    const notes = await Note.find(q)
      .populate("owner", "name email")
      .populate("sharedWith", "name email")
      .sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id" });

    const note = await Note.findById(id)
      .populate("owner", "name email")
      .populate("sharedWith", "name email");

    if (!note) return res.status(404).json({ message: "Note not found" });

    const allowed =
      isOwnerOrAdmin(note, req.user) ||
      note.sharedWith.some((u) => u._id.toString() === req.user._id.toString());

    if (!allowed) return res.status(403).json({ message: "Access denied" });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id" });

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!isOwnerOrAdmin(note, req.user))
      return res.status(403).json({ message: "Not allowed to edit" });

    if (title) note.title = title;
    if (description !== undefined) note.description = description;

    await note.save();
    const populated = await Note.findById(id)
      .populate("owner", "name email")
      .populate("sharedWith", "name email");
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id" });

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!isOwnerOrAdmin(note, req.user))
      return res.status(403).json({ message: "Not allowed to delete" });

    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id" });

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!isOwnerOrAdmin(note, req.user))
      return res.status(403).json({ message: "Only owner or admin can share" });

    const target = await User.findOne({ email: email.toLowerCase() });
    if (!target)
      return res.status(404).json({ message: "Target user not found" });

    if (target._id.toString() === note.owner.toString())
      return res.status(400).json({ message: "Cannot share with owner" });

    const already = note.sharedWith.some(
      (u) => u.toString() === target._id.toString()
    );
    if (!already) {
      note.sharedWith.push(target._id);
      await note.save();
    }

    const populated = await Note.findById(id)
      .populate("owner", "name email")
      .populate("sharedWith", "name email");
    res.json({ message: "Note shared", note: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminGetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("owner", "name email")
      .populate("sharedWith", "name email")
      .sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSharedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ sharedWith: req.user.id })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching shared notes" });
  }
};
