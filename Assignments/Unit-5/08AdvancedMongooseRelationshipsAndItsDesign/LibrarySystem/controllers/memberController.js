const Member = require("../models/memberModel");
const Book = require("../models/bookModel");

exports.addMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMemberBorrowedBooks = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId).populate(
      "borrowedBooks"
    );
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member.borrowedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
