const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const lgModel = require("../../models/Language");
const reviewModel = require("../../models/Review");

router.get(['/', '/home'], (req, res) => {
    userModel
    .find({role: {$eq:"teacher"}}).limit(4).populate("id_reviews")
    .then(teachers => {
        lgModel
            .find()
            .then(languages => {
                res.render("index", {
                    teachers,
                    languages,
                    js: ['review']
                })
            });      
    })
    .catch(dbErr => console.error(dbErr));  
})

module.exports = router;