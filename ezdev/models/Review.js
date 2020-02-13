const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    message: {
        type: String,
        maxlength: 120
    },

});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;