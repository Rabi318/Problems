const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //checks the token
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = authMiddleware;
