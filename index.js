var mongoose = require("mongoose");
var db = require("./model/mongo");
var data = require("./data");
var async = require("async");




async.each(data.items, function(item) {

    var obj1 = new db.Users(item.user);
    var obj2 = new db.UsersProfile(item.profile);
    obj1.save(function(err, obj) {

        if (err) {
            console.log("error during insertion of user");
        } else {

            obj2.user_id = obj._id;

            obj2.save(function(err, obj) {

                if (err) {
                    console.log("error during insertion of user profile");
                } else {
                    console.log("done");
                }
            });

        }
    });
});