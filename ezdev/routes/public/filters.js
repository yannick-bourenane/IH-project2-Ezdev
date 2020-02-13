const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const languageModel = require("../../models/Language");
const reviewModel = require("../../models/Review");

router.post('/price', (req, res, next) => {
    userModel.find({
        price: {
            $lte: req.body.price
        }
    }).populate("id_languages").populate("id_reviews").then(apiRes => {
        res.json(apiRes)
    }).catch(dbErr => next(dbErr))
})

router.post('/language', (req, res, next) => {
    if(req.body.languages.length !== 0) {
    userModel.find({
        id_languages: {
            $all : req.body.languages
        }
    }).populate("id_languages")
    .populate("id_reviews")
    .then(apiRes => {
        res.json(apiRes)
    })
    .catch(dbErr => next(dbErr));
    } else {
        userModel.find({role: {
            $eq: "teacher"
        }}).populate("id_languages")
        .populate("id_reviews")
        .then(apiRes => {
            res.json(apiRes)
        })
        .catch(dbErr => next(dbErr));
    }
});

module.exports = router;