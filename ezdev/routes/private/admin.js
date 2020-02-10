// students list + teachers list

const express = require("express");
const router = new express.Router();
const userModel = require("../../models/User");

router.get(['/', '/students'], (req, res, next) => {
    userModel
        .find({
            role: 'student'
        })
        .then(students => res.render("admin/students", {
            students
        }))
        .catch(dbErr => next(dbErr))
});

router.get('/teachers', (req, res, next) => {
    userModel
        .find({
            role: 'teacher'
        })
        .then(teachers => res.render("admin/teachers", {
            teachers
        }))
        .catch(dbErr => next(dbErr))
});
router.get('/delete/:id', (req, res, next) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then(dbRes => {
            req.flash("success", `account has been deleted.`)
            res.redirect(`back`)
        })
        .catch(dbErr => next(dbErr))
});
module.exports = router;