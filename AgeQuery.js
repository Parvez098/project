var db = require("./model/mongo");


var ages = [];
var counter = 0;
var sum = 0;
var date = new Date();
var years = [];


// average age logic


// this method find  year of date of birth of users 

var dobYear = () => {

    db.UsersProfile.find(function(err, items) {

        if (err) {
            console.log("error during insertion");
        } else {

            items.forEach(function(item, index, arr) {

                counter++;

                years.push(parseInt(item.dob.substring(item.dob.length - 4)));

                if (counter == arr.length) {
                    averageAge();
                }

            });

           
        }
    });

}





// this method find average age of the users . it is assuming that date of birth year will not more than current year


var averageAge = () => {

    years.forEach(function(year) {

        sum = sum + (date.getFullYear() - year);
    });

    console.log("average age is " + sum / years.length);
}


// this function begin the functionality of solving the question 1 problem

dobYear(); 




// to remove user who's older than 25


var removeUser = () => {

    db.UsersProfile.find(function(err, items) {

        if (err) {
            console.log("error during retriving");
        } else {

            items.forEach(function(item) {

                let age = date.getFullYear() - parseInt(item.dob.substring(item.dob.length - 4));

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


//this function will solve question number 2 problem . it will delete all user who is more than 25 year . 

removeUser();