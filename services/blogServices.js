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

exports.newBlogPost = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                err = 'File too large';
            }
            res.render('createBlog', { user: user, error: err })
        } else {
            if (req.file != undefined ) {
                let base64String = base64Encode(req.file.path);
                axios.post('http://localhost:4000/blogs/create-blog', {
                    "blogTitle": req.body.blogTitle,
                    "blogSubtitle": req.body.blogSubtitle,
                    "blogImg": base64String,
                    "blogContent": req.body.editor
                }).then(response => {
                    console.log('Success');
                    res.redirect('/');
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                });
            } else {
                axios.post('http://localhost:4000/blogs/create-blog', {
                    "blogTitle": req.body.blogTitle,
                    "blogSubtitle": req.body.blogSubtitle,
                    "blogContent": req.body.editor
                }).then(response => {
                    console.log('Success');
                    res.redirect('/');
                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                });
            }


        }
    });
    /*fs.writeFile('image.png', base64str, { encoding: 'base64' }, function (err) {
        console.log('File Created');
    })*/
}
