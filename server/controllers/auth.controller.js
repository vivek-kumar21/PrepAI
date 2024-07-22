const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ message: existingUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.signinWithGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.logout = async (req, res) => {
  const prevToken = req.cookies.token;

  if (!prevToken) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully logged out" });
  });
};
