var db = require("./model/mongo");


let ages = [];

var counter = 0;




// average age logic


// this method find  year of date of birth of users 

var dobYear = (ages) => {

    db.UsersProfile.find((err, items)=> {

        if (err) {
            console.log("error during insertion");
        } else {

            items.forEach((item, index, arr)=> {

                counter++;

                let age_date = new Date(Date.now() - new Date(item.dob.year,item.dob.month,item.dob.day).getTime());

                ages.push(Math.abs(age_date.getUTCFullYear() - 1970));

                if(counter == items.length)
                {
                	averageAge(ages);
                }

            });

           
        }
    });

}





// this method find average age of the users . it is assuming that date of birth year will not more than current year


var averageAge = (ages) => {

	let sum = 0; 

    ages.forEach((age)=> {

        sum = sum + age;
    });

    console.log("average age is " + sum / ages.length);
}


// this function begin the functionality of solving the question 1 problem

dobYear(ages); 




// to remove user who's older than 25


var removeUser = () => {

    db.UsersProfile.find((err, items)=>{

        if (err) {
            console.log("error during retriving");
        } else {

            items.forEach((item)=> {

                let age_date = new Date(Date.now() - new Date(item.dob.year,item.dob.month,item.dob.day).getTime());

                let age = (Math.abs(age_date.getUTCFullYear() - 1970));

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