const Resume = require("../models/Resume");

exports.createResume = async (req, res) => {
  const { userId } = req.params;
  const { extractedText } = req.body;

  try {
    const existingResume = await Resume.findOne({ userId });

    if (existingResume) {
      return res.status(400).json({ error: "Resume already exists" });
    }

    const newResume = new Resume({
      userId,
      extractedText,
    });

    await newResume.save();

    res.status(201).json({ message: newResume });
  } catch (err) {
    console.error("Error creating resume:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getResume = async (req, res) => {
  const { userId } = req.params;

  try {
    const resume = await Resume.findOne({ userId });
    // console.log(resume);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json({ message: resume });
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteResume = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedResume = await Resume.findOneAndDelete({ userId });

    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res
      .status(200)
      .json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Error deleting resume:", err);
    res.status(500).json({ error: "Server error" });
  }
};
