const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const reviewModel = require("../../models/Review");

router.get('/teachers', (req, res) => {
    res.render("list_teachers");
});

router.get('/teacher/:id', (req, res) => {
    userModel
        .findById(req.params.id)
        .then(dbRes => {
            res.render("one_teacher", {
                teacher: dbRes
            });
        })
        .catch(dbErr => console.error(dbErr));  
});

module.exports = router;