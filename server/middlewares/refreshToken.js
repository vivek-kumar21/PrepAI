const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
  // const cookies = req.headers.cookie;
  // if (!cookies) {
  //   return res.status(404).json({ message: "No token found" });
  // }
  // const prevToken = cookies.split("=")[1];
  const prevToken = req.cookies.token;
  // console.log("refreshToken: ", prevToken)

  if (!prevToken) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.clearCookie("token");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    req.user = user;
    next();
  });
};
