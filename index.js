(function() {
    var http = require('http'),
        express = require('express'),
		io = require('socket.io'),
        router = require('./lib/router'),
        models = require('./lib/db')(),
		socket = require('./lib/socket'),
        app = express(),
        port = process.env.PORT || 3000;

    // the server is created here
    var server = http.createServer(app).listen(port);
    console.log("node server running on port %s.", port);

	// set up socket.io
	var io = io.listen(server);

    // set up routing
    router(io, app);

	// set up socket.io events
	socket(io, models);


})();

