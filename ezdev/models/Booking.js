const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    id_teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    id_student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;