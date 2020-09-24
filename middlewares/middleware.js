const axios = require('axios');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

exports.isAuthenticated = function (req, res, next) {
    try {
        if (localStorage.getItem("token") == null) {
            return next();
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        return next(error);
    }
}

exports.isNotAuthenticated = function (req, res, next) {
    try {
        if (localStorage.getItem("token") != null) {
            return next();
        } else {
            return res.redirect('/signin');
        }
    } catch (error) {
        return next(error);
    }
}

exports.isBlogOwner = function (req, res, next) {
    try {
        if (localStorage.getItem("token") != null) {
            axios.post('http://localhost:4000/user/', {
                "id": localStorage.getItem("userId"),
            }).then(async (response) => {
                asyncForEach(response.data, (blog) => {
                    if (blog == req.params.blogId) {
                        return next();
                    }
                })
                await waitFor(850);
                return res.redirect('/blogs/' + req.params.blogId);
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message);
                    const error = err.response.data.message;
                }
            })
        } else {
            return res.redirect('/signin');
        }
    } catch (error) {
        return next(error);
    }
}

exports.isUserProfileOwner = function (req, res, next) {
    try {
        if (localStorage.getItem("token") != null) {
            if (localStorage.getItem("userId") == req.params.userId) {
                return next();
            } else {
                return res.redirect('/users/' + req.params.userId);
            }
        } else {
            return res.redirect('/signin');
        }
    } catch (error) {
        return next(error);
    }
}