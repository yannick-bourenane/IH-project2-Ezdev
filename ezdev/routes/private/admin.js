// students list + teachers list

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get('/admin/students', (req, res) => {
    res.render("admin/students");
});

router.get('/admin/teachers', (req, res) => {
    res.render("admin/teachers");
});

module.exports = router;