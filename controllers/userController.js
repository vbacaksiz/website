let user = require('../models/user');
let userServices = require('../services/userServices')


exports.contactUser = function(req, res){
    res.render('contact', {user: user});
};

exports.userProfile = function(req, res){
    userServices.userProfile(req, res);
};

exports.aboutUser = function(req, res){
    userServices.aboutUser(req, res);
}

exports.updateProfile = function(req, res){
    userServices.updateProfile(req, res);
}

exports.updateProfilePost = function(req, res){
    userServices.updateProfilePost(req, res);
}

exports.updateProfilePhoto = function(req, res){
    userServices.updateProfilePhoto(req, res);
}

exports.updateProfilePhotoPost = function(req, res){
    userServices.updateProfilePhotoPost(req, res);
}

exports.loginUser = function(req, res){
    res.render('auths/signin', {user: user});
    user.firstName = undefined;
    user.lastName = undefined;
};

exports.newUser = function(req, res){
    res.render('auths/signup');
};

/*exports.newUserPost = function(req, res){
    axios.post('http://localhost:4000/user/signup', {
    "firstName": "vola",
    "lastName": "Bacaksız",
    "email": "33333@mail.com",
    "password": "33333"
    }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
        res.status(401).json({
            error: err
        });
    });
}*/

exports.newUserPost = (req, res) => {
    userServices.newUserPost(req, res);
}

exports.loginUserPost = (req, res) => {
    userServices.loginUserPost(req, res);
}

exports.logoutUser = (req, res) => {
    user.firstName = undefined;
    user.lastName = undefined;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    res.redirect('signin');
}

