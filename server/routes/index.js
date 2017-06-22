var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let signupControl = require('../controller/signupcontrol');
let logicControl = require('../controller/logiccontrol');
let movieSearch = require('../controller/moviecontrol');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
/*routes for signup */
router.post('/signup', signupControl.newUser);
/*routes for login */
router.post('/login', logicControl.userlogin);

/*routes for movies search */
router.get('/movie/search', movieSearch.moviesearch);
/*routes for movies to add favourite movie */
router.post('/movie/add', movieSearch.addfavourite);
/*routes for movies to dispaly favourite movies */
router.get('/movie/view', movieSearch.displayfav);
/*routes for movies to delete favourite movie */
router.get('/movie/delete', movieSearch.deletefav);
module.exports = router;