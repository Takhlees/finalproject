// middleware/authenticateRole.js
const jwt = require("jsonwebtoken");

const authenticateRole = (role) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log("Token:", token); // Debug token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token Error:", err.message); // Debug JWT error
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded.user;
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    });
  };
};

module.exports = authenticateRole;
