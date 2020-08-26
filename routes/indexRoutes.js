const express = require('express');
const router = express.Router();

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

router.get("/", (req, res)=>{
    res.render('home', {data : data});
});

router.get("/about", (req, res)=>{
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;