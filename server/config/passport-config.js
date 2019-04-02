var session = require("express-session")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User=require('../models/model-users')
module.exports = function (server) {
    server.use(session({ secret: "User-Session" }));
    server.use(passport.initialize());
    server.use(passport.session());
    passport.use(new LocalStrategy(
        function (username,password, next) {
            console.log(username,password);
            User.findOne( {
             email :username, 
             password :password
            },(err,user)=>{
                console.log(user);
            if (user) {
                console.log(user._id)
                next(null, user);
            } else {
                next(null, false);
            }}
            )}
    ));

               
    passport.serializeUser(function (user, next) {
        next(null, user._id.toHexString());
    
    });
    passport.deserializeUser(function (userId, next) {
        User.findOne({ _id: userID }, function(err, user){
            next(err, user);
        })
})}