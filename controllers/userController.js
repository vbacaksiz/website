const axios = require('axios');

let user = require('../models/user');


exports.contactUser = function(req, res){
    res.render('contact');
};

exports.userProfile = function(req, res){
    res.render('profile');
};

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
    axios.post('http://localhost:4000/user/signup', {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    }).then(response => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        res.redirect('signin');
      }).catch(err => {
        if(err.response){
            formData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
            console.log(err.response.data.message);
            const error = err.response.data.message;
            res.render('auths/signup', {error: error, formData: formData});
        }
    });
}