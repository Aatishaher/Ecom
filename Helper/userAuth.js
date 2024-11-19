const jwt = require('jsonwebtoken'); // Import jsonwebtoken

function Auth() {
    const secret = process.env.JWTPass; // Get the secret key from environment variables

    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

        // Check if token exists
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, secret);

            // Attach decoded data (e.g., user info) to the request object
            req.user = decoded; 
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error); // Log the error for debugging purposes
            return res.status(400).send('Invalid or expired token'); // Provide error response
        }
    };
}

module.exports = Auth;
