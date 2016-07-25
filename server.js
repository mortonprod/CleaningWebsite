/// <reference path="typings/index.d.ts" />
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'client')));
///Express with use http verb as function attached to url. This will then some call back for responses and requests.
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

app.get('/index', function (req, res) {
    console.log("Got a GET request for /index at " + __dirname);
    ///TODO:Use resolve so you do not have OS dependent format issues.
    res.sendFile(path.resolve(__dirname, 'index.html'));
})
app.get('/app', function (req, res) {
    console.log("Got a GET request for /index at " + __dirname);
    ///TODO:Use resolve so you do not have OS dependent format issues.
    res.sendFile(path.resolve(__dirname, 'AppDeploy/index.html'));
})


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})