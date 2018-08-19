let mongoose = require("mongoose"),
    Camp = require("./models/campground"),
    Comment = require("./models/comment")


let data = [
    {
        name: "Himalayas",
        image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt placeat aliquam, atque enim delectus dolore illum ad quasi, velit labore nam rerum optio corrupti totam inventore tempora unde similique."
    },
    {
        name: "Salmon hills",
        image: "https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt placeat aliquam, atque enim delectus dolore illum ad quasi, velit labore nam rerum optio corrupti totam inventore tempora unde similique."
    },
    {
        name: "Mount Rest's",
        image: "https://images.pexels.com/photos/290448/pexels-photo-290448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt placeat aliquam, atque enim delectus dolore illum ad quasi, velit labore nam rerum optio corrupti totam inventore tempora unde similique."
    }
]


function seedDB() {
    Camp.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed all campground");
            data.forEach(function (seed) {
                Camp.create(seed, function (err, camp) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("camp added");
                        Comment.create(
                            {
                                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt placeat aliquam, atque enim delectus dolore illum ad quasi, velit labore nam rerum optio corrupti totam inventore tempora unde similique.",
                                author: "Lorem"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    camp.comments.push(comment);
                                    camp.save();
                                    console.log("new comment added");
                                }
                            }
                        )
                    }
                });
            });
        }
    });
}

module.exports = seedDB;