const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get('/teachers', (req, res) => {
    res.render("list_teachers");
});

router.get('/teacher/:id', (req, res) => {
    res.render("one_teacher");
});

module.exports = router;