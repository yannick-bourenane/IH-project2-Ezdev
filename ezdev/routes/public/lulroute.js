const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt")
const userModel = require("../../models/User");
const reviewModel = require("../../models/Review");
router.post('/teacher/reviews/:id', (req, res, next) => {
    userModel.findbyId(req.params.id).populate('id_reviews').then(teacher => {
        const arr = [];
        teacher.id_reviews.forEach(review => {
            arr.push(review.rate)
        })
        arr.push(req.body.rate)
        let arrLength = arr.length
        let totalRate = arr.reduce((acc, cValue) => acc += cValue, 0);
        let averageRate = totalRate / arrLength;
        console.log(averageRate)
    }).catch(dbErr => next(dbErr))
})