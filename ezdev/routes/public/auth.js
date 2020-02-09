const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt")
const userModel = require("../../models/User");
const languageModel = require("../../models/Language");
const uploader = require("../../config/cloudinary")

router.get('/signin', (req, res) => {
    res.render("auth/signin");
})
router.get('/signup', (req, res) => {
    languageModel.find().then(languages => {
        res.render("auth/signup", {
            languages
        })
    }).catch(dbErr => next(dbErr))
})

router.post('/signup', uploader.single('avatar'), (req, res, next) => {
    const user = req.body;

    if (!user.email || !user.password || !user.firstname || !user.lastname || !user.role) {
        req.flash("error", "Fill all the required fields please.");
        return res.redirect("/auth/signup");
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then(dbRes => {
                if (dbRes) {
                    req.flash("error", "sorry, email is already taken :/");
                    return res.redirect("/auth/signup"); //
                }

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;

                if (req.file) user.avatar = req.file.secure_url
                userModel.create(user).then(dbRes => {
                    req.flash("success", "account created !");
                    res.redirect('/auth/signup')
                }).catch(dbErr => next(dbErr))
            })
            .catch(dbErr => next(dbErr))
    }
})

router.post('/signin', (req, res, next) => {
    const user = req.body;

    if (!user.email || !user.password) {
        req.flash("error", "wrong credentials");
        return res.redirect("/auth/signin");
    }

    userModel
        .findOne({
            email: user.email
        })
        .then(dbRes => {
            if (!dbRes) {
                req.flash("error", "wrong credentials");
                return res.redirect("/auth/signin");
            }
            if (bcrypt.compareSync(user.password, dbRes.password)) {
                const {
                    _doc: clone //_doc because of dbMongo Response
                } = {
                    ...dbRes
                };

                delete clone.password;
                req.session.currentUser = clone;
                return res.redirect("/");
            } else {
                req.flash("error", "wrong credentials");
                return res.redirect("/auth/signin");
            }
        })
        .catch(next);
})

router.get("/signout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/signin");
    });
});

module.exports = router;