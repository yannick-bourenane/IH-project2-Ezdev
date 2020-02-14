const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const languageModel = require("../../models/Language");
const reviewModel = require("../../models/Review");
const protectRoute = require("../../middlewares/protectRoute")

function capitalizeFLetter(value) {
    return value[0].toUpperCase() + value.slice(1);
}

router.get("/teachers", (req, res, next) => {
    if (req.query.language) {
        const languageQuery = capitalizeFLetter(req.query.language);
        languageModel.find().then(languages => {
                let filter = []
                languages.forEach(element => {
                    if (languageQuery == element.name) filter.push(element._id);
                })
                userModel
                    .find({
                        $and: [{
                                role: {
                                    $eq: "teacher"
                                }
                            },
                            {
                                id_languages: {
                                    $in: filter
                                }
                            }
                        ]
                    })
                    .populate("id_languages")
                    .then(dbRes => {
                        const arrPrice = [...dbRes];
                        const minPrice = Math.min.apply(
                            Math,
                            arrPrice.map(teacher => teacher.price)
                        );
                        const maxPrice = Math.max.apply(
                            Math,
                            arrPrice.map(teacher => teacher.price)
                        );
                        res.render("list_teachers", {
                            fullteachers: dbRes,
                            languages: languages,
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                            js: ["filters", "review"]
                        });
                    })
                    .catch(dbErr => next(dbErr));
            })
            .catch(dbErr => next(dbErr));
    } else {
        languageModel.find().then(languages => {
                userModel
                    .find({
                        role: {
                            $eq: "teacher"
                        }
                    })
                    .populate("id_languages")
                    .then(dbRes => {
                        const arrPrice = [...dbRes];
                        const minPrice = Math.min.apply(
                            Math,
                            arrPrice.map(teacher => teacher.price)
                        );
                        const maxPrice = Math.max.apply(
                            Math,
                            arrPrice.map(teacher => teacher.price)
                        );
                        res.render("list_teachers", {
                            fullteachers: dbRes,
                            languages: languages,
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                            js: ["filters", "review"]
                        });
                    })
                    .catch(dbErr => next(dbErr));
            })
            .catch(dbErr => next(dbErr));
    }

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
                .populate("id_languages").limit(4)
                .then(dbRes2 => {
                    res.render("one_teacher", {
                        teacher: dbRes,
                        fullteachers: dbRes2,
                        js: ["teachers"]
                    });
                });
        })
        .catch(dbErr => console.error(dbErr));
});

module.exports = router;

router.get("/teacher/reviews/:id", (req, res, next) => {
    userModel
        .findById(req.params.id)
        .populate("id_reviews")
        .then(dbRes => {
            reviewModel
                .find()
                .then(dbRes2 => {
                    res.render("reviews", {
                        teacher: dbRes,
                        review: dbRes2,
                        js: ["review", "addReview"]
                    });
                })
                .catch(dbErr => next(dbErr));
        })
        .catch(dbErr => console.error(dbErr));
});

router.post("/teacher/reviews/:id", protectRoute, (req, res, next) => {
    if (!req.body.rate || !req.body.message) {
        req.flash("error", "Please fill all the fields");
        return res.redirect("back");
    } else {
        const {
            rate,
            message
        } = req.body;
        reviewModel
            .create({
                rate,
                message
            })
            .then(review => {
                userModel
                    .findByIdAndUpdate(
                        req.params.id, {
                            $push: {
                                id_reviews: review._id
                            }
                        }, {
                            new: true
                        }
                    )
                    .populate("id_reviews")
                    .then(teacher => {
                        const arr = [];
                        teacher.id_reviews.forEach(element => {
                            arr.push(element.rate);
                        });
                        let arrLength = arr.length;
                        let totalRate = arr.reduce((acc, cValue) => (acc += cValue), 0);
                        let averageRate = Number(totalRate / arrLength);
                        userModel
                            .findByIdAndUpdate(req.params.id, {
                                averageRate: Math.round(averageRate)
                            })
                            .then(dbRes => {
                                res.redirect("back");
                            })
                            .catch(dbErr => next(dbErr));
                    })
                    .catch(dbErr => next(dbErr));
            })
            .catch(dbErr => next(dbErr));
    }
});