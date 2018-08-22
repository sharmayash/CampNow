let express = require("express"),
    router = express.Router({ mergeParams: true }),
    Camp = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware")

// ============ Comment routes =========

//  find comments from db

router.get("/new", middleware.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, campFounded) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campFounded });
        }
    });
});

// create new comments

router.post("/", function (req, res) {
    Camp.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    req.flash("success", "Successfully Commented");
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            })
        }
    })
});

// comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Camp.findById(req.params.id, function (err, foundCamp) {
        if (err || !foundCamp) {
            req.flash("error", "No camp found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
            }
        });
    });
});

// comment UPDATE route
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;