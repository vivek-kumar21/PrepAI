const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    extractedText: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Resume", resumeSchema);