const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const passport = require("passport");

const userRoutes = require("./routes/user.routes.js");
const resumeRoutes = require("./routes/resume.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
require("dotenv").config();
require("./config/passport");

const port = process.env.PORT || 8001;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json());

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", authRoutes);
app.use("/api/users", userRoutes);
app.use("/resume", resumeRoutes)
// http://localhost:8000/api/users

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
