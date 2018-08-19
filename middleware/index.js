let Camp = require("../models/campground"),
    Comment = require("../models/comment")

let middlewareObj = {};

middlewareObj.checkCampOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, function (err, campFounded) {
            if (err) {
                req.flash("error", "Page not found");
                res.redirect("back");
            } else {
                if (campFounded.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied !!!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "PLEASE LOGIN TO DO THAT");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, commentFounded) {
            if (err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if (commentFounded.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "PLEASE LOGIN TO DO THAT");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = middlewareObj;