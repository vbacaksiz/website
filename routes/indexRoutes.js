const express = require('express');
const router = express.Router();


let blogController = require('../controllers/blogController');
let userController = require('../controllers/userController');

router.get("/", blogController.blogList);

router.get("/about", blogController.blogDetail);

router.get('/contact', userController.contactUser);

router.get('/profile', userController.userProfile);

router.get('/create-blog', blogController.newBlog);

router.get('/signin', userController.loginUser);

router.get('/signup', userController.newUser);

router.post('/signup', userController.newUserPost);

router.post('/signin', userController.loginUserPost);

router.get('/logout', userController.logoutUser);

module.exports = router;