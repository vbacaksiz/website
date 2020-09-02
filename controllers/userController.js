const axios = require('axios');
/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());*/

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

exports.newUserPost = function(req, res){
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
}

/*exports.newUserPost = (req, res) => {
    Headers = {
        'Content-Type': 'application/json'
    }
    body = JSON.stringify({
        user: {
            firstName: req.body.firstName
        }
    })
    console.log(user.firstName);
}*/