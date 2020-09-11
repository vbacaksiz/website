let user = require('../models/user');
let userServices = require('../services/userServices')


exports.contactUser = function(req, res){
    if (localStorage.getItem("token") != null) {
        res.render('contact', {user: user});
    } else {
        res.redirect('signin');
    }
};

exports.userProfile = function(req, res){
    if (localStorage.getItem("token") != null) {
        res.render('profile', {user: user});
    } else {
        res.redirect('signin');
    }
};

exports.loginUser = function(req, res){
    if (localStorage.getItem("token") == null) {
        res.render('auths/signin', {user: user});
        user.firstName = undefined;
        user.lastName = undefined;
    } else {
        res.redirect('/');
    }
};

exports.newUser = function(req, res){
    if (localStorage.getItem("token") == null) {
        res.render('auths/signup');
    } else {
        res.redirect('/');
    }
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
    res.redirect('signin');
}