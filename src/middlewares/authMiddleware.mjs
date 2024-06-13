import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.query.token || req.body.token;
  if (!token) {
    return res.status(401).json({ error: "No se obtuvo un token valido " });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token es invalido" });
  }
};
