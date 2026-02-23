import jwt from "jsonwebtoken";
import JWT_SECRET_PASSWORD from "../confiq.js";
const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid or expired" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_PASSWORD);
    req.user = req.user || {};
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default userMiddleware;
