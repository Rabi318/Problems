const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Unauthorized:Access Denied" });
    }
    next();
  };
};

module.exports = allowRoles;
