const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("verifyToken: ", token)

  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
