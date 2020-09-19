const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    email : {type:String, required:true},
    password : {type:String, required:true},
    createdDate : {type:Date, default:Date.now()},
    blogs: []
});

let user = mongoose.model('user', userSchema);

