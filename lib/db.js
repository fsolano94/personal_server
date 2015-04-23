(function() {
    var mongoose = require('mongoose'),
        schemas = require('./logic/schemas');

    var db = mongoose.connection;


    function connectToDatabase(models) {
        db.on('error', console.error);

        db.once('open', function() {

            // create a model that maps to my schema
            models.MealPlanModel = mongoose.model('MealPlan', schemas.MealPlanSchema);
			models.WorkoutModel = mongoose.model('Workout', schemas.WorkoutSchema);


            console.log("modals have been loaded");
        });

        mongoose.connect('mongodb://localhost/myserver');
    }


    module.exports = function() {
        var models = {};

        connectToDatabase(models);
        return models;
    }

}) (module);


