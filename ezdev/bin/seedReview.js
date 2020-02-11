const userModel = require('../models/User')
const mongoose = require('mongoose')
const reviewModel = require("../models/Review");

const reviewList = [
    {
        rate : 5,
        message: "Awesome, I recommand him !"
    },
    {
        rate : 4,
        message: "Awesome, I recommand him !"
    },
    {
        rate : 3,
        message: "He was good but my english was not good enough"
    },
    {
        rate : 1,
        message: "He even didn't know what he was talking about !"
    },
    {
        rate : 2,
        message: "His course was not even uptodate"
    },
    {
        rate : 5,
        message: "Awesome, I recommand this teacher !"
    },
    {
        rate : 4,
        message: "Graaaaaaaave cool !"
    },
    {
        rate : 5,
        message: "He masters PHP, finaly I managed to improve my skills"
    },
    {
        rate : 5,
        message: "Awesome, I recommand him !"
    },
    {
        rate : 1,
        message: "I wanted to follow a React course, this teacher just knows HTML/CSS"
    },
    {
        rate : 3,
        message: "The teacher was cool but the course is not really up-to-date"
    },
];

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

    reviewModel.create(reviewList).then(dbRes => console.log(dbRes)).catch(dbErr => console.log(dbErr))
}
pushSeed();