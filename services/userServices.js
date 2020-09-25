const axios = require('axios');
const fs = require('fs');
const multer = require('multer');

let user = require('../models/user');
let blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 102400 },
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
}).single('img');

function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test((file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return callback(null, true);
    } else {
        callback('Error: Images Only');
    }
}

function base64Encode(file) {
    let bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

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
        if (err.response) {
            formData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
            console.log(err.response.data.message);
            const error = err.response.data.message;
            res.render('auths/signup', { error: error, formData: formData });
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
        fs.writeFile('public/userImages/' + user.id + '.png', response.data.img, { encoding: 'base64' }, function (err) {
        });
        user.img = 'userImages/' + user.id + '.png';
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token", token);
        res.redirect('/');
    }).catch(err => {
        if (err.response) {
            console.log(err.response.data.message);
            const error = err.response.data.message;
            user.email = req.body.email;
            res.render('auths/signin', { user: user, error: error })
        }
    })
}

exports.userProfile = async (req, res) => {
    axios.get('http://localhost:4000/user/' + req.params.userId).then(async (foundUser) => {
        fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
        fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
        for (let i = 0, j = 0; i < foundUser.data.blogDetail.length; i += 3, j++) {
            fs.writeFile('public/blogImages/' + foundUser.data.blog[j] + '.png', foundUser.data.blogDetail[i + 2], { encoding: 'base64' }, function (err) {
            });
            foundUser.data.blogDetail[i + 2] = 'blogImages/' + foundUser.data.blog[j] + '.png';
        }
        res.render('profile/userProfile', { user: user, foundUser: foundUser.data, page: 'userProfile' })
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.aboutUser = (req, res) => {
    axios.get('http://localhost:4000/user/' + req.params.userId + '/about').then(foundUser => {
        fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
        fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
        res.render('profile/userAbout', { user: user, foundUser: foundUser.data, page: "about" });
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.updateProfile = (req, res) => {
    axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
        fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
        fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
        res.render('profile/userProfileUpdate', { user: user, foundUser: foundUser.data, page: "updateProfile" });
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.updateProfilePost = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                err = 'File too large';
            }
            axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
                fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
                });
                foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
                fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
                });
                foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
                return res.render('profile/userProfileUpdate', { user: user, foundUser: foundUser.data, error: err });
            }).catch(err => {
                console.log(err);
                console.log('error');
            })
        } else {
            if (req.file != undefined) {
                let base64String = base64Encode(req.file.path);
                axios.post('http://localhost:4000/user/' + req.params.userId + '/update-profile', {
                    "twitter": req.body.twitter,
                    "facebook": req.body.facebook,
                    "github": req.body.github,
                    "instagram": req.body.instagram,
                    "about": req.body.editor,
                    "backgroundImg": base64String
                }).then(response => {
                    fs.unlinkSync(req.file.path);
                    console.log('Success');
                    res.redirect('/users/' + req.params.userId);
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    fs.unlinkSync(req.file.path);
                });
            } else {
                axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
                    axios.post('http://localhost:4000/user/' + req.params.userId + '/update-profile', {
                        "twitter": req.body.twitter,
                        "facebook": req.body.facebook,
                        "github": req.body.github,
                        "instagram": req.body.instagram,
                        "about": req.body.editor,
                        "backgroundImg": foundUser.data.userBackgroundImg
                    }).then(response => {
                        console.log('Success2');
                        res.redirect('/users/' + req.params.userId);
                    }).catch(err => {
                        if (err.response) {
                            console.log(err.response.data.message);
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    console.log('error');
                });
            }
        }
    });
}

exports.updateProfilePhoto = (req, res) => {
    axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
        fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
        fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
        });
        foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
        res.render('profile/userProfilePhotoUpdate', { user: user, foundUser: foundUser.data, page: "updateProfilePhoto" });
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.updateProfilePhotoPost = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                err = 'File too large';
            }
            console.log('a');
            axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
                fs.writeFile('public/userImages/' + foundUser.data._id + '.png', foundUser.data.userImg, { encoding: 'base64' }, function (err) {
                });
                foundUser.data.userImg = 'userImages/' + foundUser.data._id + '.png';
                fs.writeFile('public/userBackgroundImages/' + foundUser.data._id + '.png', foundUser.data.userBackgroundImg, { encoding: 'base64' }, function (err) {
                });
                foundUser.data.userBackgroundImg = 'userBackgroundImages/' + foundUser.data._id + '.png';
                return res.render('profile/userProfilePhotoUpdate', { user: user, foundUser: foundUser.data, error: err });
            }).catch(err => {
                console.log(err);
                console.log('error');
            })
        } else {
            if (req.file != undefined) {
                let base64String = base64Encode(req.file.path);
                axios.post('http://localhost:4000/user/' + req.params.userId + '/update-profile-photo', {
                    "img": base64String
                }).then(response => {
                    fs.unlinkSync(req.file.path);
                    console.log('Success');
                    res.redirect('/users/' + req.params.userId);
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    fs.unlinkSync(req.file.path);
                });
            } else {
                axios.get('http://localhost:4000/user/' + req.params.userId + '/update-profile').then(foundUser => {
                    axios.post('http://localhost:4000/user/' + req.params.userId + '/update-profile-photo', {
                        "img":foundUser.data.userImg
                    }).then(response => {
                        console.log('Success2');
                        res.redirect('/users/' + req.params.userId);
                    }).catch(err => {
                        if (err.response) {
                            console.log(err.response.data.message);
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    console.log('error');
                })
            }
        }
    });
}