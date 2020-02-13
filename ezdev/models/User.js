const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    avatar: {
        type: String,
        default: "/img/avatar-default.png"
    },
    role: {
        type: String,
        required: true
    },
    id_languages: [{
        type: Schema.Types.ObjectId,
        ref: "Language"
    }],
    id_reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    price: {
        type: Number
    },
    description: {
        type: String
    },
    averageRate: {
        type: Number,
        min: 1,
        max: 5
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;