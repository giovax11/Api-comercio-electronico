import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.query.token || req.body.token;
  if (!token) {
    return res.status(401).json({ error: "Invalid token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again to continue." });
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};
