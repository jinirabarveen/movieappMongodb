let signupschema = require('../models/schema');
let signupControl = {
    /*this will call the signup in router */
    newUser: function(req, res) {
        console.log("am in insert");
        console.log(req.body.name);
        var userdetails = {
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
                conpassword: req.body.conpassword
            }
            /*signup details inserted in database */
        var db = new signupschema(userdetails);
        db.save();
        console.log("inserted");
        res.redirect('/index.html');

    }
}
module.exports = signupControl;