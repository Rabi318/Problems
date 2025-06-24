module.exports = function (requiredRoles) {
  return function (req, res, next) {
    const role = req.header("x-role");
    if (!role || !requiredRoles.includes(role.toLowerCase())) {
      return res
        .status(403)
        .json({ error: "Access denied. Insufficient role." });
    }
    next();
  };
};
