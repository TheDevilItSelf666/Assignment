const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Access denied, no token provided" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: "Access denied, invalid token" });

    const decoded = jwt.verify(token, process.env.S_key);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
}


function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Forbidden: You don't have permission" });
    }
    next();
  };
}

module.exports = { verifyToken, authorizeRoles };
