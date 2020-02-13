// students list + teachers list

const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");
const reviewModel = require("../../models/Review");
const protectAdminRoute = require("../../middlewares/protectAdminRoute");

router.get(['/', '/students'], protectAdminRoute, (req, res, next) => {
    userModel
        .find({
            role: 'student'
        })
        .then(students => res.render("admin/students", {
            students
        }))
        .catch(dbErr => next(dbErr))
});

router.get('/teachers', protectAdminRoute, (req, res, next) => {
    userModel
        .find({
            role: 'teacher'
        })
        .then(teachers => res.render("admin/teachers", {
            teachers
        }))
        .catch(dbErr => next(dbErr))
});
router.get('/teachers/reviews/:id', protectAdminRoute, (req, res, next) => {
    userModel
        .findById(req.params.id).populate('id_reviews')
        .then(teacher => res.render("admin/reviews", {
            teacher: teacher
        }))
        .catch(dbErr => next(dbErr))
});
router.get('/teachers/reviews/delete/:id', protectAdminRoute, (req, res, next) => {
    reviewModel
        .findByIdAndDelete(req.params.id)
        .then(review => res.redirect('back'))
        .catch(dbErr => next(dbErr))
});
router.get('/delete/:id', protectAdminRoute, (req, res, next) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then(dbRes => {
            req.flash("success", `account has been deleted.`)
            res.redirect(`back`)
        })
        .catch(dbErr => next(dbErr))
});
module.exports = router;