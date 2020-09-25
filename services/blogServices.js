const axios = require('axios');
const fs = require('fs');
const multer = require('multer');

let user = require('../models/user');
let blog = require('../models/blog');

let deletedBlogTitle = undefined;
let messages = undefined;

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

exports.newBlogPost = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                err = 'File too large';
            }
            res.render('createBlog', { user: user, error: err })
        } else {
            if (req.file != undefined) {
                let base64String = base64Encode(req.file.path);
                axios.post('http://localhost:4000/blogs/create-blog', {
                    "blogTitle": req.body.blogTitle,
                    "blogSubtitle": req.body.blogSubtitle,
                    "blogImg": base64String,
                    "blogContent": req.body.editor,
                    "email": user.email
                }).then(response => {
                    fs.unlinkSync(req.file.path);
                    console.log('Success');
                    console.log(response.data.id);
                    res.redirect('/blogs/' + response.data.id);
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    fs.unlinkSync(req.file.path);
                });
            } else {
                console.log(user.email);
                axios.post('http://localhost:4000/blogs/create-blog', {
                    "blogTitle": req.body.blogTitle,
                    "blogSubtitle": req.body.blogSubtitle,
                    "blogContent": req.body.editor,
                    "email": user.email
                }).then(response => {
                    console.log('Success');
                    res.redirect('/blogs/' + response.data.id);
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                });
            }
        }
    });
}

exports.blogList = (req, res) => {
    axios.get('http://localhost:4000/blogs/').then(foundBlogs => {
        foundBlogs.data.forEach((blog) => {
            fs.writeFile('public/blogImages/' + blog._id + '.png', blog.blogImg, { encoding: 'base64' }, function (err) {
            });
            blog.blogImg = 'blogImages/' + blog._id + '.png';
        })
        res.render('home', { user: user, foundBlogs: foundBlogs.data, deletedBlogTitle: deletedBlogTitle });
        deletedBlogTitle = undefined;
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}


exports.blogDetail = (req, res) => {
    axios.get('http://localhost:4000/blogs/' + req.params.blogId).then(foundBlog => {
        fs.writeFile('public/blogImages/' + foundBlog.data._id + '.png', foundBlog.data.blogImg, { encoding: 'base64' }, function (err) {
            console.log('File created');
        });
        foundBlog.data.blogImg = 'blogImages/' + foundBlog.data._id + '.png';
        res.render('blogDetail', { user: user, foundBlog: foundBlog.data, message: messages })
        messages = undefined;
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.blogDelete = (req, res) => {
    axios.delete('http://localhost:4000/blogs/' + req.params.blogId).then(result => {
        console.log('Deleted');
        deletedBlogTitle = result.data.blogTitle;
        res.redirect('/');
    }).catch(err => {
        console.log('err');
    })
}

exports.blogUpdate = (req, res) => {
    axios.get('http://localhost:4000/blogs/' + req.params.blogId).then(foundBlog => {
        fs.writeFile('public/blogImages/' + foundBlog.data._id + '.png', foundBlog.data.blogImg, { encoding: 'base64' }, function (err) {
            console.log('File created');
        });
        foundBlog.data.blogImg = 'blogImages/' + foundBlog.data._id + '.png';
        return res.render('updateBlog', { user: user, foundBlog: foundBlog.data });
    }).catch(err => {
        console.log(err);
        console.log('error');
    })
}

exports.blogUpdatePost = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                err = 'File too large';
            }
            axios.get('http://localhost:4000/blogs/' + req.params.blogId).then(foundBlog => {
                fs.writeFile('public/blogImages/' + foundBlog.data._id + '.png', foundBlog.data.blogImg, { encoding: 'base64' }, function (err) {
                    console.log('File created');
                });
                foundBlog.data.blogImg = 'blogImages/' + foundBlog.data._id + '.png';
                return res.render('updateBlog', { user: user, foundBlog: foundBlog.data, error: err });
            }).catch(err => {
                console.log(err);
                console.log('error');
            })
        } else {
            if (req.file != undefined) {
                let base64String = base64Encode(req.file.path);
                axios.post('http://localhost:4000/blogs/' + req.params.blogId, {
                    "blogTitle": req.body.blogTitle,
                    "blogSubtitle": req.body.blogSubtitle,
                    "blogImg": base64String,
                    "blogContent": req.body.editor,
                }).then(response => {
                    fs.unlinkSync(req.file.path);
                    messages = "Blog Updated Successfully!";
                    console.log('Success');
                    res.redirect('/blogs/' + req.params.blogId);
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    fs.unlinkSync(req.file.path);
                });
            } else {
                axios.get('http://localhost:4000/blogs/' + req.params.blogId).then(foundBlog => {
                    axios.post('http://localhost:4000/blogs/' + req.params.blogId, {
                        "blogTitle": req.body.blogTitle,
                        "blogSubtitle": req.body.blogSubtitle,
                        "blogContent": req.body.editor,
                        "blogImg": foundBlog.data.blogImg
                }).then(response => {
                            console.log('Update Success');
                            messages = "Blog Updated Successfully!";
                            res.redirect('/blogs/' + req.params.blogId);
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
    })
}