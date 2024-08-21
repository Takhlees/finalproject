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
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      // Check role
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access Denied' });
      }

      // Add user data to request object
      req.user = decoded;
      next();
    });
  };
};

module.exports = authenticateRole;
