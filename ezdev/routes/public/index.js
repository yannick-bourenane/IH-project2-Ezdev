const express = require("express");
const router = new express.Router();
// const userModel = require("../../models/User");

router.get(['/', '/home'], (req, res) => {
    res.render("index");
})

module.exports = router;