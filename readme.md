Camp.create({
    name: "Mount rest's",
    image: "https://images.pexels.com/photos/290448/pexels-photo-290448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
}, function (err, camp) {
    if (err) {
        console.log(err);
    } else {
        console.log("New Camp Added");
        console.log(camp);
    }
})


let campgrounds = [
    { name: "Himalayas", image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Salmon Hills", image: "https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Mount rest's", image: "https://images.pexels.com/photos/290448/pexels-photo-290448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }
];

