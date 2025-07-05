const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "Unauthorized:Token Missing" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized:Invalid Token" });
  }
};

module.exports = authMiddleware;
