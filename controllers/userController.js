let user = require('../models/user');

exports.contactUser = function(req, res){
    res.render('contact');
};

exports.userProfile = function(req, res){
    res.render('profile');
};

exports.loginUser = function(req, res){
    res.render('auths/signin');
};

exports.newUser = function(req, res){
    res.render('auths/signup');
};