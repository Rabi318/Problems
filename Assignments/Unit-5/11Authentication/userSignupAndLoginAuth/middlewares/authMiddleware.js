const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized:Token Missing" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Unauthorized:Invalid Token" });
    req.user = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
