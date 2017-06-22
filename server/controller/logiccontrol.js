let loginschema = require('../models/schema');

let logicControl = {
    /*this function wil login in router */
    userlogin: function(req, res) {
        /*this will compare the username and password in the database */
        loginschema.findOne({
            'username': req.body.name
        }, function(err, result) {
            if (result == null)
                res.redirect('/error.html');
            else {
                if (req.body.name === result.username && req.body.password === result.password) {
                    console.log("login page ," + req.body.name);
                    res.redirect('/movieapp.html');
                } else {
                    console.log("am in else");
                    res.redirect('/error.html');
                }
            }


        });

    }


}
module.exports = logicControl;