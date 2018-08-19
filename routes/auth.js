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
    res.render("register");
});

router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, newUser) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome " + newUser.username);
            res.redirect("/");
        });
    });
});

// ========= LOGIN ROUTE =========

//   show login page

router.get("/login", function (req, res) {
    res.render("login");
});

//   handles login logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {
});

// LOGOUT ROUTE

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/");
});


module.exports = router;