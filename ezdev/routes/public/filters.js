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

module.exports = router;