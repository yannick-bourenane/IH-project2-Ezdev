const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

const languageModel = mongoose.model('Language', languageSchema);

module.exports = languageModel;