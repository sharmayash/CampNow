let express = require("express"),
    router = express.Router(),
    Camp = require("../models/campground"),
    middleware = require("../middleware")

// INDEX ROUTE - show/find all camps from db

router.get("/", function (req, res) {
    Camp.find({}, function (err, allCampFrmDB) {
        if (err) {
            console.log(err);
        } else {
            res.render("camps/Index", { camp: allCampFrmDB });
        }
    })
});

// CREATE ROUTE -- add new camps

router.post("/", middleware.isLoggedIn, function (req, res) {
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.desc;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCamp = { name: name, image: img, desc: desc, author: author };
    Camp.create(newCamp, function (err, newlyCamp) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// NEW ROUTE TO ADD SOMETHING -- show page for creating new camps

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("camps/new");
});

// SHOW ROUTE -- opens new page on clicking a camp to show details about it.

router.get("/:id", function (req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function (err, campFounded) {
        if (err) {
            console.log(err);
        } else {
            res.render("camps/show", { campground: campFounded });
        }
    })
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function (req, res) {
    Camp.findById(req.params.id, function (err, campFounded) {
        res.render("camps/edit", { camp: campFounded });
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampOwnership, function (req, res) {
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function (err, founded) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy a Campground
router.delete("/:id", middleware.checkCampOwnership, function (req, res) {
    Camp.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;