let movieschema = require('../models/newschema');
let request = require('request');

module.exports = {
    /*this method will call movie/search in router */
    moviesearch: function(req, res, next) {
        console.log("am in search movie router");
        /*requesting api in tmdb */
        request.get('https://api.themoviedb.org/3/search/movie?api_key=731d96383cdf751b7cfafe0303f82ea3&language=en-US&query=' + req.query.moviename + '&page=1&include_adult=false', function(err, response, body) {
            // request.get('https://api.themoviedb.org/3/search/movie?api_key=731d96383cdf751b7cfafe0303f82ea3&language=en-US&query='+req.query.moviename+'&page=1&include_adult=false',function(err,response,body){
            console.log(req.query.moviename);
            if (response.statusCode == 200) {
                res.json(response.body);
                console.log("am in if");
            } else {
                console.log("am in else")
                res.send('error occured');
            }
        });


    },
    /*this function will call movie/add in router */
    addfavourite: function(req, res) {
        console.log(req.body.title);
        var data = (JSON.parse(req.body.data));
        var favmovie = {
                title: data.title,
                poster: data.poster,
                release_date: data.release_date,
                username:req.body.username
            }
            /*favmovie added in the database */
        var movie = new movieschema(favmovie);
        movie.save();
        console.log("movie inserted");
        res.redirect('/movieapp.html');

    },
    /*this function will call movie/view in router */
    displayfav: function(req, res) {
        /*this will find the movies in favmovies in database */
        movieschema.find({'username':req.query.username},function(err, data) {
            if (err)
                throw err;
            else {
                res.send(data);
            }
        });
    },
    /*this function will call the deletefavourite in router */
    deletefav: function(req, res) {
        var tit = req.query.title;
        /*this remove the movie in favmovies in database */
        movieschema.remove({
            title: tit,username:req.query.username
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.send("success");
            }
        });


    }

};