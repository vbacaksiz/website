const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
let token = "";
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
let userBlogs = [];

const indexRoutes = require("./routes/indexRoutes");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(indexRoutes);

const server = app.listen(3000, (err) => {
    if(err){
        console.log(err);
    }
    console.log('App started. Port number : %d ', server.address().port);
});