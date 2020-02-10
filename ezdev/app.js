require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/hbs");

// base dependencies
const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const path = require("path");
const flash = require('connect-flash')


// initial config
// app.set("view engine", "hbs");
// app.set("views", __dirname + "/views");
// app.use(express.static(__dirname, "public"));
// hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public"))); // static files (public for browsers)
app.set("views", path.join(__dirname, "views")); // wahre are the pages ?
app.set("view engine", "hbs"); // which template engine
hbs.registerPartials(path.join(__dirname, "views/partials")); // where are the tiny chunks of views ?
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);

// FLASH MESSAGES
// enable "flash messaging" system
// it depends on the express-session mechanism
app.use(flash());

// CUSTOM MIDDLEWARES
// expose flash message to the hbs templates, if any flash-message is defined
app.use(require("./middlewares/exposeFlashMessage"));

// app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in... 
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))
function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  if (res.locals.isLoggedIn) {
    if (res.locals.user.role === 'teacher') res.locals.isTeacher = true;
  }
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}

function eraseSessionMessage() {
  var count = 0; // initialize counter in parent scope and use it in inner function
  return function (req, res, next) {
    if (req.session.msg) { // only increment if session contains msg
      if (count) { // if count greater than 0
        count = 0; // reset counter
        req.session.msg = null; // reset message
      }
      ++count; // increment counter
    }
    next(); // continue to the requested route
  };
}

app.use(checkloginStatus);
app.use(eraseSessionMessage());

// Getting/Using router(s)
const auth = require("./routes/public/auth");
app.use("/auth/", auth);

const index = require("./routes/public/index");
app.use("/", index);

const teachers = require("./routes/public/teachers");
app.use("/", teachers);

const admin = require("./routes/private/admin");
app.use("/admin/", admin);

module.exports = app;