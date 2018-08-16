var db = require("./model/mongo");
var async = require("async");


var ages = [];
var counter = 0;
var sum = 0;
var date = new Date();
// average age logic




function ageAverage() {
    db.UsersProfile.find(function(err, items) {

        if (err) {
            console.log("error during insertion");
        } else {
            async.each(items, function(item) {


                var index = item.dob.lastIndexOf("-");

                ages.push(parseInt(item.dob.substring(index + 1)));

                counter++;

                if (items.length == counter) {
                    display();
                }
            });

        }
    });

}






function display() {

    ages.forEach(function(age, index, array) {

        sum = sum + age;
    })

    console.log("average age is " + sum / ages.length);
}



 ageAverage();



 

// to remove user who's older than 25


function removeUser() {
    db.UsersProfile.find(function(err, items) {

        if (err) {
            console.log("error during retriving");
        } else {

            async.each(items, function(item) {

                var index = item.dob.lastIndexOf("-");

                var year = parseInt(item.dob.substring(index + 1));

                var age = date.getFullYear() - year;

                console.log(age);

                if (age > 25) {

                    db.UsersProfile.deleteOne({ _id: item._id }, function(err) {

                        if (err) {
                            console.log("error");
                        } else {
                            console.log("deleted succesfully");
                        }
                    });
                }


            });
        }
    });
}


removeUser();