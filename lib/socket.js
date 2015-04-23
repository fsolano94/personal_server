(function() {


	module.exports = function(io, models) {

		// general purpose test
		io.sockets.on('connection', function(socket){
			socket.emit('alive', {'message': 'Carrier Has Arrived'});



			// client-side-event for getting all meal plans in the database
			socket.on('get-meal-plans', function(data) {

				// get all meal plans from the database
				models.MealPlanModel.find( function(err, results) {
					if(err) {
						console.error('failed to get meal plans from server. Error: %s', err);
						socket.emit('query-failure', {'data': err});
						return false;
					}

					// if there were no errors, emit results back to the client
					socket.emit('query-success', {'data': results});
				});
			});


			// client-side-event for getting one single meal plan from the database
			socket.on('get-meal-plan', function(data) {

				// find a meal plan that has the given _id
				models.MealPlanModel.find( {_id: data._id}, function(err, results) {
					if(err) {
						console.error('failed to get meal plan from server. Error: %s', err);
						socket.emit('query-failure', {'data': err});
						return false;
					}

					// if there were no errors, emit results back to the client
					socket.emit('query-success', {'data': results});
				});
			});


			// client-side-event for saving / updating a meal plan in the database
			socket.on('save-meal-plan', function(data) {

				// update an existing object
				if (data._id) {
					models.MealPlanModel.findByIdAndUpdate(data._id, data, function (err, mealPlan) {
						if (err) {
							console.error("something went wrong, failed to save a mealPlan with id %s", mealPlan._id);
							socket.emit('saved-failure', {});
						}
						else {
							console.log("successfully saved mealPlan with id &s", mealPlan._id);
							socket.emit('saved-success', {});
						}
					});
				}

				// create a new object, and save it
				else {
					var mealPlan = new models.MealPlanModel({
						_id: data._id,
						title: data.title,
						mealNames: data.mealNames || [],
						meals: {
							Monday: data.meals.Monday || [],
							Tuesday: data.meals.Tuesday || [],
							Wednesday: data.meals.Wednesday || [],
							Thursday: data.meals.Thursday || [],
							Friday: data.meals.Friday || [],
							Saturday: data.meals.Saturday || [],
							Sunday: data.meals.Sunday || []
						}
					});

					mealPlan.save(function (err, mealPlan) {
						if (err) {
							console.error("something went wrong, failed to save a mealPlan with id %s", mealPlan._id);
							socket.emit('saved-failure', {});
						}
						else {
							console.log("successfully saved mealPlan with id &s", mealPlan._id);
							socket.emit('saved-success', {});
						}
					});
				}

			});


			// client-side event for loading all workouts in the database
			socket.on('getWorkouts', function(data) {

				// get all workouts from the database
				models.WorkoutModel.find( function(err, results) {
					if(err) {
						console.error('failed to get workouts from server. Error: %s', err);
						socket.emit('query-failure', {'data': err});
						return false;
					}

					// if there were no errors, emit results back to the client
					socket.emit('query-success', {'data': results});
				});
			});


			// client-side event for loading a specific workout from the database
			socket.on('getWorkout', function(data) {

				// find a meal plan that has the given _id
				models.WorkoutModel.find( {_id: data._id}, function(err, results) {
					if(err) {
						console.error('failed to get the workout from server. Error: %s', err);
						socket.emit('query-failure', {'data': err});
						return false;
					}

					// if there were no errors, emit results back to the client
					socket.emit('query-success', {'data': results});
				});
			});


			// client-side event for saving a specific workout to the database
			socket.on('saveWorkout', function(data) {

				// update an existing object
				if (data._id) {
					models.WorkoutModel.findByIdAndUpdate(data._id, data, function (err, workout) {
						if (err) {
							console.error("something went wrong, failed to save a workout with id %s", workout._id);
							socket.emit('saved-failure', {});
						}
						else {
							console.log("successfully saved workout with id &s", workout._id);
							socket.emit('saved-success', {});
						}
					});
				}

				// create a new object, and save it
				else {
					var workout = new models.WorkoutModel({
						_id: data._id,
						date: data.date,
						name: data.name,
						details: data.details
					});

					workout.save(function (err, workout) {
						if (err) {
							console.error("something went wrong, failed to save a workout with id %s", workout._id);
							socket.emit('saved-failure', {});
						}
						else {
							console.log("successfully saved workout with id &s", workout._id);
							socket.emit('saved-success', {});
						}
					});
				}

			});



		}); // end all socket events
	};

})();

