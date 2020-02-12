const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rate: {
        type: Number,
        min: 0,
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