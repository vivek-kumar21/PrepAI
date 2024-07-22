const { getResume, createResume, deleteResume } = require("../controllers/resume.controller");

const router = require("express").Router();

router.get("/:userId", getResume);
router.post("/:userId", createResume);
router.delete("/:userId", deleteResume);

module.exports = router;