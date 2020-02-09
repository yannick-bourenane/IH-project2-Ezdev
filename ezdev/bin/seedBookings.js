const bookingModel = require('../models/Booking')
const mongoose = require('mongoose')

const bookingsList = [{
    id_teacher: '',
    id_teacher: '',
    message: 'I want to book some sessions in March',
    isAccepted: true,
}]
async function pushSeed() {
    await mongoose
        .connect('mongodb://localhost/ezdev', {
            useNewUrlParser: true
        })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        });

    bookingModel.create(bookingsList).then(dbRes => console.log(dbRes)).catch(dbErr => console.log(dbErr))
}
pushSeed();