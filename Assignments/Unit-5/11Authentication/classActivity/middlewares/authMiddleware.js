const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistTokemModel");

const authMiddleware = (role) => {
  //checks the token
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized:Token Missing" });
    }
    //check the token is not present on the blacklist
    let blackListTokenCheck = BlacklistToken.exists(token);
    if (blackListTokenCheck) {
      return res.status(401).json({ msg: "Unauthorized:Token blacklisted" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Unauthorized:Invalid Token" });
      }
      if (!role.includes(decoded.role)) {
        return res.status(403).json({ msg: "Unauthorized:Access Denied" });
      }
      req.user = decoded;
      next();
    });
  };
};

module.exports = authMiddleware;
