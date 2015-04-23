(function(module) {

    var path = require('path'),
		__public = path.join(__dirname + '/../public'),
        __views = path.join(__dirname + '/../public/views');



    module.exports = function(io, app) {

        app.get([ '/' , '/home' ], function(req, res) {
            res.sendFile( path.join(__views + '/index.html') );
        });

        app.get('/meal-plans', function(req, res) {
            res.sendFile( path.join(__views + '/meal-plans.html') )
        });

		app.get('/meal-plan', function(req, res) {
			res.sendFile( path.join(__views + '/meal-plan.html') )
		});

		app.get('/workouts', function(req, res) {
			res.sendFile( path.join(__views + '/workouts.html') );
		});

		app.get('/workout-editor', function(req, res) {
			res.sendFile( path.join(__views + '/workout-editor.html') );
		});

		// route for serving up /js , /css , or /lib assets
		app.get(['/js/*' , '/css/*', '/lib/*'], function(req, res) {
			console.log("serving a request for: %s", req.originalUrl);
			res.sendFile( path.join(__public + req.originalUrl) );
		});


		// catch-all route
        app.get('*', function(req, res) {
			console.log("caught a '%s' request for url '%s'", req.method, req.originalUrl);
            res.sendFile( path.join(__views + '/error.html') );
        });

    }



})(module);


