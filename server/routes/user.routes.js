const {
  signup,
  login,
  logout,
  signinWithGoogle,
} = require("../controllers/auth.controller.js");
const { getUser } = require("../controllers/user.controller.js");
const { refreshToken } = require("../middlewares/refreshToken.js");
const verifyToken = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/google", signinWithGoogle);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
