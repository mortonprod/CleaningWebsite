var express = require('express');
var path = require('path');
var app = express();


app.get('/contact', function (req, res) {

    //TODO:Note:This is how we create a new user after setting up the db in models/user. The db will be created automatically.
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });

    // save the sample user
    nick.save(function (err) {
        if (err) {
            res.json({ success: false });
            throw err;
        }

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
});