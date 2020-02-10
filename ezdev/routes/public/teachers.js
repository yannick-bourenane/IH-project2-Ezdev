const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
// const reviewModel = require("../../models/Review");

router.get('/teachers', (req, res) => {
    res.render("list_teachers");
});

router.get('/teacher/:id', (req, res) => {
    userModel
        .findById(req.params.id)
        .populate("id_languages")
        .then(dbRes => {
            userModel.find({"_id": {$ne:req.params.id}})
            .populate("id_languages")
            .then(dbRes2 => {
                res.render("one_teacher", {
                    teacher: dbRes,
                    fullteachers: dbRes2
                });
            })
           
        })
        .catch(dbErr => console.error(dbErr));  
});

module.exports = router;