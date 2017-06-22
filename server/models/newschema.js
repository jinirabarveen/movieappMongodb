/*datas to be added in the databse in favmovies */
var mongoose = require('mongoose');
var schema = mongoose.Schema({
    title: String,
    poster: String,
    release_date: String,
    username: String
});
var datas = mongoose.model('favmovies', schema);
module.exports = datas;