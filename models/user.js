const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")



const  userSchema = new mongoose.Schema({
    email:{
        type:String,
        require: true,
    },
    
})

userSchema.plugin(passportLocalMongoose);// user.plugin() automaticaly username and password field generate kar deta hai 
module.exports =mongoose.model("User", userSchema)