const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
    // Check if the Authorization header is present
    const token = req.header('Authorization'); // Extract token from the header
    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Remove 'Bearer ' part to get the actual token
    const actualToken = token.replace('Bearer ', '');

    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(actualToken, process.env.JWTPass);

        // Check if the decoded user is an admin
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Access denied. You do not have admin privileges.' });
        }

        // Attach the decoded user information to the request object for further use
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = adminAuth;
