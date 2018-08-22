let express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")


//============= HOME ROUTE =================
router.get("/", function (req, res) {
    res.render("landing");
});

// ============ Auth Routes ===========

// Sign Up route

router.get("/register", function (req, res) {
    res.render("register", {page: 'register'});
});

router.post("/register", function (req, res) {
    let newUser = new User({ username: req.body.username });
    User.register(newUser , req.body.password, function (err, newUser) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome " + newUser.username);
            res.redirect("/campgrounds");
        });
    });
});

// ========= LOGIN ROUTE =========

//   show login page

router.get("/login", function (req, res) {
    res.render("login", {page: 'login'});
});

//   handles login logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

// LOGOUT ROUTE

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;