

let mongoose = require("mongoose");
// Schema Setup
let campSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ] 
});

module.exports = mongoose.model("Camp", campSchema);

// Camp.create({
//     name: "Mount rest's",
//     image: "https://images.pexels.com/photos/290448/pexels-photo-290448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat corporis voluptatem dolores cum dicta molestias modi harum delectus at, placeat culpa nulla sunt accusamus reiciendis? Est distinctio amet eius enim."
// }, function (err, camp) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("New Camp Added");
//         console.log(camp);
//     }
// })

