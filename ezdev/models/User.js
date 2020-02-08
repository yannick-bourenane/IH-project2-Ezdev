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
    avatar: {
        type: String,
        default: "lala"
    },
    role: {
        type: String,
        required: true
    },
    id_language: {
        type: Schema.Types.ObjectId,
        ref: "Language"
    },
    price: {
        type: String
    }
});

const userModel = mongoose.model("Sneaker", userSchema);

module.exports = userModel;