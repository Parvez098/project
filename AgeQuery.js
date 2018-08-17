var db = require("./model/mongo");


let ages = [];

let counter = 0;



const year = 350;
const age_condition = 25;
// average age logic


// this method find  year of date of birth of users 

let dobYear = (ages) => {

    db.UsersProfile.find((err, items)=> {

        if (err) {
            console.log("error during insertion");
        } else {

            items.forEach((item, index, arr)=> {

                counter++;

                 let date1 = new Date(item.dob);
                 let date2 = new Date();

                 let diff_in_days = parseInt((date2 - date1)/(24*60*60*1000));
                 

                 ages.push(parseInt(diff_in_days/year));

                if(counter == items.length)
                {
                	averageAge(ages);
                } 

            });

           
        }
    });

}





// this method find average age of the users . it is assuming that date of birth year will not more than current year


let averageAge = (ages) => {

	let sum = 0; 

    ages.forEach((age)=> {

        sum = sum + age;
    });

    console.log("average age is " + sum / ages.length);
}


// this function begin the functionality of solving the question 1 problem

dobYear(ages); 




// to remove user who's older than 25


let removeUser = () => {

    db.UsersProfile.find((err, items)=>{

        if (err) {
            console.log("error during retriving");
        } else {

            items.forEach((item)=> {

                let date1 = new Date(item.dob);
                let date2 = new Date();

                



                if (parseInt(((date2-date1)/(24*60*60*1000))/year) > age_condition) {

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