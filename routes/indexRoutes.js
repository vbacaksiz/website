const express = require('express');
const router = express.Router();

let authGuard = require('../middlewares/middleware');
let blogController = require('../controllers/blogController');
let userController = require('../controllers/userController');

router.get('/', authGuard.isNotAuthenticated, blogController.blogList);

router.get('/about', authGuard.isNotAuthenticated, blogController.siteDetail);

router.get('/contact', authGuard.isNotAuthenticated, userController.contactUser);

router.get('/profile', authGuard.isNotAuthenticated, userController.userProfile);

router.get('/create-blog', authGuard.isNotAuthenticated, blogController.newBlog);

router.post('/create-blog', authGuard.isNotAuthenticated, blogController.newBlogPost);

router.get('/signin', authGuard.isAuthenticated, userController.loginUser);

router.get('/signup', authGuard.isAuthenticated, userController.newUser);

router.post('/signup', authGuard.isAuthenticated, userController.newUserPost);

router.post('/signin', authGuard.isAuthenticated, userController.loginUserPost);

router.get('/logout', authGuard.isNotAuthenticated, userController.logoutUser);

module.exports = router;