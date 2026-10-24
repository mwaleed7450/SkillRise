import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not Authorized, Token Missing",
      });
    }

    let token = header.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: String(decoded.id), role: decoded.role };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not Authorized, Invalid Token",
    });
  }
};
