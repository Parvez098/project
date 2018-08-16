var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/exampleDB");

var UsersSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String

});

var UsersProfileSchema = new Schema({
    user_id:String,
    dob:String,
    mobile_no:String
});

module.exports.Users = mongoose.model("Users",UsersSchema);
module.exports.UsersProfile = mongoose.model("UsersProfile",UsersProfileSchema);