(function() {

	var socket = io.connect();


	// define a socket event for a successful query for all workouts
	socket.on('query-success', function(result) {
		console.log("query-success called!! Data: " + result.data);

		populatePage(result.data);
	});

	// define a socket event for an unsuccessful query for all workouts
	socket.on('query-failure', function(result) {
		console.error("query-failure called... Data: " + result.data);
		alert('Sorry, but we failed to query the database.  Something has gone wrong.');
	});

	function init() {
		setupEventHandlers();

		// emit a request to server-side logic to pull up all meal plans in the database
		socket.emit('getWorkouts', {});

		// delete the WorkoutId property from the sessionStorage, if it exists
		if(sessionStorage.WorkoutId)	delete sessionStorage.WorkoutId;
	}

	function setupEventHandlers() {
		document.getElementById('newWorkout').onclick = function() {
			location.href = '/workout-editor';
		}
	}

	function populatePage(workouts) {
		var container = document.getElementById('workouts');

		// handle case with workouts.length == 0
		if(workouts.length == 0) {
			var label = document.createElement('label');

			label.innerText = "No workouts were found.  Please create a new workout to get started.";
			container.appendChild(label);
		}

		else {
			workouts.forEach(function(workout) {
				// use core HTML to create a button that will link to our workout template
				var label = document.createElement('label');
				var button = document.createElement("button");
				var linebreak = document.createElement("br");
				var linebreak2 = document.createElement("br");

				label.innerText = workout.date + '..............................' + workout.name;
				button.innerText = 'Edit Workout';
				button.classList.add('indent');

				button.onclick = function() {
					sessionStorage.WorkoutId = workout._id;
					location.href = '/workout-editor';
				};

				container.appendChild(label);
				container.appendChild(button);
				container.appendChild(linebreak);
				container.appendChild(linebreak2);
			});
		}

	}

	init();

})();

