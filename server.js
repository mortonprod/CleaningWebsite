///TODO:Remember useful=> install(npm) nodemon then place=>    "dev": "nodemon server.js" is script section of package
///This will restart server after changes after you call this in dev terminal with=> nodemon server.js
///Must set user and password to connect to mongodb
///To test this use tcping in visual studios directory.Drag and drop exe in command line to run.Format: command <address> <port>
/// <reference path="typings/index.d.ts" />
var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var mongojs = require('mongojs');
//var db = mongojs("mongodb://demo_user:demo_password@ds027769.mongolab.com:27769/demo_database");
var db = mongojs("mongodb://Alex:tottimorton2000@ds021915.mlab.com:21915/mytest");
console.log("DB: " + db);
var mycollection = db.collection('customers')
console.log("Collection: " + mycollection);
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
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
})


//var server = app.listen(8080, function () {

//    var host = server.address().address
//    var port = server.address().port

//    console.log("Example app listening at http://%s:%s", host, port)

//})
var server = http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    console.log("Res: " + response);
    mycollection.find(function (err, records) {
        console.log("Rec: " + records);
        if (err) {
            console.log("There was an error executing the database query.");
            response.end();
            return;
        }
        var html = '<h2>Vehicles with a red finish</h2>',
            i = records.length;

        while (i--) {
            html += '<p><b>Name:</b> '
                + records[i].name
                + ' <br /><b>Number of wheels:</b> '
                + records[i].wheels
                + '<br /><b>Color: </b>'
                + records[i].color;
        }
        response.write(html);
        response.end();
    });
});
//
server.listen(8080);