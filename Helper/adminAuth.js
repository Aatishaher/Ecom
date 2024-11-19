const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token using the secret key

    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return res.status(403).send('Access denied. You do not have admin privileges.');
    }

    req.user = decoded;  // Attach user info to request object (optional, if needed in route)
    next();  // Proceed to the next middleware/route
  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid or expired token');
  }
}

module.exports = adminAuth;
