const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked by admin" });
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};