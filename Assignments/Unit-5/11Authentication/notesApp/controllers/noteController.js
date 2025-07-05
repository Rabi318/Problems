const Note = require("../models/noteModel");

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({
      title,
      content,
      createdBy: req.user.userId,
    });
    res.status(201).json({ msg: "Note created", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.status(200).json({ msg: "All notes", notes });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json({ msg: "Note updated", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json({ msg: "Note deleted", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports = { createNote, getNotes, updateNote, deleteNote };
