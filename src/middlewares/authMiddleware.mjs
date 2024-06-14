import jwt from "jsonwebtoken";

/**
 * Authentication middleware
 *
 * Verifies the authentication token and sets the req.user property
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 */
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.query.token || req.body.token;
  //Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Invalid token provided" });
  }
  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    //Invalid token
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again to continue." });
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};
