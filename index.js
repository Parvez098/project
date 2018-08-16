var express = require("express");
var mongoose = require("mongoose");
var db = require("./model/mongo");
var data = require("./data");
var async  = require("async");



/*
var obj = new db.Users({ firstName: 'sonu', lastName: 'ahmed', email: "sonu@gmai.com", password: "123" });

obj.save(function(err, obj) {
    if (err) {
        console.log("error");
    } else {
        console.log(obj)
        console.log("saved");
    }
})



for(i=0;i<data.object.length;i++)
{
    var obj1 = new db.Users(data.object[i].user);
    var obj2 = new db.UsersProfile(data.object[i].profile);



    obj1.save(function(err,obj)
    {
        if(err)
        {
            console.log("error during insertion of user");
        }
        else
        {

             console.log(obj1);
             obj2.user_id = obj1._id;
             console.log(obj2);

                obj2.save(function(err,obj){
                
                if(err)
                {
                    console.log("error during insertion of userprofile");
                }
                else
                {
                    
                }
            })

            
        }
    });
}
*/


async.each(data.items,function(item){
    
    var obj1 = new db.Users(item.user);
    var obj2 = new db.UsersProfile(item.profile);
    obj1.save(function(err,obj){

        if(err)
        {
            console.log("error during insertion of user");
        }
        else
        {
            
            obj2.user_id = obj._id;

            obj2.save(function(err,obj){

                if(err)
                {
                    console.log("error during insertion of user profile");
                }
                else
                {
                    console.log("done");
                }
            })

         }
    })
});
