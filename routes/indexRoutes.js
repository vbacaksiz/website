const express = require('express');
const router = express.Router();

let authGuard = require('../middlewares/middleware');
let blogController = require('../controllers/blogController');
let userController = require('../controllers/userController');

router.get('/', authGuard.isNotAuthenticated, blogController.blogList);

router.get('/blogs/:blogId', authGuard.isNotAuthenticated, blogController.blogDetail);

router.post('/blogs/:blogId', authGuard.isBlogOwner, blogController.blogDelete);

router.get('/blogs/:blogId/update', authGuard.isBlogOwner, blogController.blogUpdate);

router.post('/blogs/:blogId/update', authGuard.isBlogOwner, blogController.blogUpdatePost);

router.get('/about', authGuard.isNotAuthenticated, blogController.siteDetail);

router.get('/contact', authGuard.isNotAuthenticated, userController.contactUser);

router.get('/create-blog', authGuard.isNotAuthenticated, blogController.newBlog);

router.post('/create-blog', authGuard.isNotAuthenticated, blogController.newBlogPost);

router.get('/signin', authGuard.isAuthenticated, userController.loginUser);

router.get('/signup', authGuard.isAuthenticated, userController.newUser);

router.post('/signup', authGuard.isAuthenticated, userController.newUserPost);

router.post('/signin', authGuard.isAuthenticated, userController.loginUserPost);

router.get('/users/:userId', authGuard.isNotAuthenticated, userController.userProfile);

router.get('/users/:userId/about', authGuard.isNotAuthenticated, userController.aboutUser);

router.get('/users/:userId/update-profile', authGuard.isUserProfileOwner, userController.updateProfile);

router.post('/users/:userId/update-profile', authGuard.isUserProfileOwner, userController.updateProfilePost);

router.get('/users/:userId/update-profile-photo', authGuard.isUserProfileOwner, userController.updateProfilePhoto);

router.post('/users/:userId/update-profile-photo', authGuard.isUserProfileOwner, userController.updateProfilePhotoPost);

router.get('/logout', authGuard.isNotAuthenticated, userController.logoutUser);

module.exports = router;