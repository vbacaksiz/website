const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    postTitle : {type:String, required:true},
    postSubtitle : String,
    post : {type:String, required:true},
    createdDate : {type:Date, default:Date.now()}
});

let blog = mongoose.model('blog', blogSchema);

