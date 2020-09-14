let blog = require('../models/blog');
let user = require('../models/user');
const { render } = require('ejs');
const axios = require('axios');


let data = [
    {
        postTitle: "Blog denemesi",
        postSubtitle: "qqqqqqqqqqqqqqqqqqqqq",
        image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    },
    {
        postTitle: "Blog denemesi 2",
        postSubtitle: "wwwwwwwwwwwwwwwwwwwwwwwwwww",
        image: "https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    },
    {
        postTitle: "Blog denemesi 3",
        postSubtitle: "eeeeeeeeeeeeeeeeeee",
        image: "https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    }
]

exports.blogList = function (req, res) {
    res.render('home', {user: user, data: data });
};

exports.blogDetail = function (req, res) {
    res.render('about', { user: user });
};

exports.newBlog = function (req, res) {
    res.render('createBlog', { user: user });
};

/*exports.newBlogPost = (req, res) => {
    const blogTitle = req.body.blogTitle;
    console.log(blogTitle);
    const blogSubtitle = req.body.blogSubtitle;
    console.log(blogSubtitle);
    const blogContent = req.body.editor;
    console.log(blogContent);
    const blogImg = req.body.img;
    console.log(blogImg);
    res.render('createBlog', {user: user});
};*/

exports.newBlogPost = (req, res) => {
    console.log(req.body.img);
    axios.post('http://localhost:4000/blogs/create-blog', {
        "blogTitle": req.body.blogTitle,
        "blogSubtitle": req.body.blogSubtitle,
        "blogImg": req.body.img,
        "blogContent": req.body.editor
    }).then(response => {
        console.log('Success');
        res.redirect('/');
      }).catch(err => {
        if(err.response){
            console.log(err.response.data.message);
        }
    });
}


/*axios.post('http://localhost:4000/user/signup', {
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
}*/