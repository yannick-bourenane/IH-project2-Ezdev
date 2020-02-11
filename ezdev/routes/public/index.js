const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const lgModel = require("../../models/Language");

router.get(['/', '/home'], (req, res) => {
    userModel
    .find({role: {$eq:"teacher"}}).limit(4)
    .then(teachers => {
        lgModel.find().then(languages => {
            res.render("index", {
                teachers,
                languages
            });
        })
      
    })
    .catch(dbErr => console.error(dbErr));  
})

module.exports = router;