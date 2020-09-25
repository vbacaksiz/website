let blog = require('../models/blog');
let user = require('../models/user');
const { render } = require('ejs');

let blogServices= require('../services/blogServices');

exports.blogList = (req, res) => {
    blogServices.blogList(req, res);
}

exports.newBlog = function (req, res) {
    res.render('createBlog', { user: user });
};

exports.newBlogPost = (req, res) => {
    blogServices.newBlogPost(req, res);
}

exports.blogDetail = (req, res) => {
    blogServices.blogDetail(req, res);
}

exports.blogDelete = (req, res) => {
    blogServices.blogDelete(req, res);
}

exports.blogUpdate = (req, res) => {
    blogServices.blogUpdate(req, res);
}

exports.blogUpdatePost = (req, res) => {
    blogServices.blogUpdatePost(req, res);
}
