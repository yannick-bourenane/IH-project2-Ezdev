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
                res.render("review", {
                    teacher: dbRes,
                    review: dbRes2,
                    js: ['review']
                });
            })
            .catch(dbErr => console.log(dbErr));
        })
        .catch(dbErr => console.error(dbErr));
});

router.post("/teacher/reviews/:id", (req, res, next) => {
    const {rate, message} = req.body
    reviewModel.create({
        rate,
        message
    })
    .then(review => {
        userModel
            .findByIdAndUpdate(req.params.id, {"$push" : {
                "id_reviews": review._id
            }})
            .then(teacher => {
                const arr = [];
                teacher.id_reviews.forEach(review => {
                    arr.push(review.rate)
                })
                let arrLength = arr.length
                let totalRate = arr.reduce((acc, cValue) => acc += cValue, 0);
                let averageRate = totalRate / arrLength;
                userModel
                    .findByIdAndUpdate(req.params.id, {
                        averageRate: averageRate
                    })
                    .then(dbRes => {
                        res.redirect("back")
                    })
                    .catch(dbErr => next(dbErr)) 
            })
            .catch(dbErr => next(dbErr))
    })
    .catch(dbErr => next(dbErr))
    
})