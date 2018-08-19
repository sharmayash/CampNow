let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Camp = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

// Requiring routes

let campRoutes = require("./routes/camp"),
    commentRoutes = require("./routes/comment"),
    authRoutes = require("./routes/auth")


// seedDB();
//mongoose.connect("mongodb://localhost/camp_now");
mongoose.connect("mongodb://campnow:qwerty121@ds020938.mlab.com:20938/campnow");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// ============ PASSPORT SETUP ==============
app.use(require("express-session")({
    secret: "this is the secret code",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);


app.listen(process.env.PORT || 8080, function () {
    console.log("server started");
});