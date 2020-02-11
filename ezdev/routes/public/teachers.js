const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const languageModel = require("../../models/Language");
const reviewModel = require("../../models/Review");

router.get("/teachers", (req, res, next) => {
    languageModel
        .find()
        .then(languages => {
            userModel
                .find({
                    role: {
                        $eq: "teacher"
                    }
                })
                .populate("id_languages")
                .then(dbRes => {
                    const arrPrice = [...dbRes];
                    const minPrice = Math.min.apply(Math, arrPrice.map(teacher => teacher.price));
                    const maxPrice = Math.max.apply(Math, arrPrice.map(teacher => teacher.price));
                    res.render("list_teachers", {
                        fullteachers: dbRes,
                        languages: languages,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                        js: ['filters']
                    });
                }).catch(dbErr => next(dbErr));
        })
        .catch(dbErr => next(dbErr));

});

router.get("/teacher/:id", (req, res) => {
    let idArray = [];
    userModel
        .findById(req.params.id)
        .populate("id_languages")
        .then(dbRes => {
            matching = Math.floor(Math.random() * dbRes.id_languages.length);
            idArray.push(dbRes.id_languages[matching]);
            userModel
                .find({
                    $and: [{
                            _id: {
                                $ne: req.params.id
                            }
                        },
                        {
                            role: {
                                $eq: "teacher"
                            }
                        },
                        {
                            id_languages: {
                                $in: idArray
                            }
                        }
                    ]
                })
                .populate("id_languages")
                .then(dbRes2 => {
                    res.render("one_teacher", {
                        teacher: dbRes,
                        fullteachers: dbRes2
                    });
                });
        })
        .catch(dbErr => console.error(dbErr));
});

module.exports = router;

router.get("/teacher/reviews/:id", (req, res) => {
    userModel
        .findById(req.params.id)
        .populate("id_reviews")
        .then(dbRes => {
            reviewModel.find()
            .then(dbRes2 => {
                res.render("partials/review", {
                    teacher: dbRes,
                    review: dbRes2
                });
            })
            .catch(dbErr => console.log(dbErr));
        })
        .catch(dbErr => console.error(dbErr));
});