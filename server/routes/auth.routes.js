// routes/auth.routes.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

const app = express();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    const { user, token } = req.user;

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    res.redirect("http://localhost:3000"); // Redirect to your client-side application
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

module.exports = router;
