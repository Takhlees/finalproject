// middleware/authenticateRole.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate role
const authenticateRole = (role) => {
  return (req, res, next) => {
    // Get token from headers
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Ensure this matches the payload structure
    next();
  };
};

module.exports = authenticateRole;
