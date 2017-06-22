/*datas to be added in the mydetails in database */
var mongoose = require('mongoose');
var schema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    conpassword: String
});
var datas = mongoose.model('mydetails', schema);
module.exports = datas;