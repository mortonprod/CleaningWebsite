/// <reference path="../../typings/index.d.ts" />
import createApp from "./server/createApp.ts"; 

/// @function checkRender - If template rendered then send otherwise redirect.
var app = createApp();
///Populate req.cookies. 

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
});