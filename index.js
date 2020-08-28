const mongoose = require('mongoose');
const express = require('express');
const app = express();

const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(indexRoutes);
app.use(adminRoutes);

const server = app.listen(3000, (err) => {
    if(err){
        console.log(err);
    }
    console.log('App started. Port number : %d ', server.address().port);
});