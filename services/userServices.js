const axios = require('axios');

let user = require('../models/user');

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

exports.loginUserPost = (req, res) => {
    axios.post('http://localhost:4000/user/login', {
        "email": req.body.email,
        "password": req.body.password
    }).then(response => {
        user.email = req.body.email;
        user.firstName = response.data.firstName;
        user.lastName = response.data.lastName;
        token = response.data.token;
        user.id = response.data.id;
        user.blogs = response.data.blogs;
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token", token);
        res.redirect('/');
    }).catch(err => {
        if(err.response){
            console.log(err.response.data.message);
            const error = err.response.data.message;
            user.email = req.body.email;
            res.render('auths/signin', {user: user, error: error})
        }
    })
}