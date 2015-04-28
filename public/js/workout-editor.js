(function() {
	var socket = io.connect();

	// define a socket event for a successful query for the workout
	socket.on('query-success', function(result) {
		console.log("query-success called!! ");

		populateForm(result.data);
	});

	// define a socket event for an unsuccessful query for the workout
	socket.on('query-failure', function(result) {
		console.error("query-failure called... Data: " + result.data);
		alert('ERROR: Something has gone wrong. Did not retrieve workout info.');
	});

	// define a socket event for successfully saving this item (after clicking save)
	socket.on('saved-success', function(result) {
		console.log('successfully saved changes...');
		alert("This workout has been successfully saved and uploaded to the database");
		location.href = '/workouts';
	});

	// define a socket event for failing to save this item (after clicking save)
	socket.on('saved-failure', function(result) {
		console.error('Something went wrong, failed to save changes...');
		alert("This workout FAILED to be uploaded to the database... Sorry about that.");
	});

	function init() {
		setupEventHandlers();

		if(sessionStorage.WorkoutId) {
			// request the meal plan's information from the server
			socket.emit('getWorkout', {_id: sessionStorage.WorkoutId});
		}
	}

	function setupEventHandlers() {
		document.getElementById('btn-cancel').onclick = function() {
			console.log("Canceled new workout, did not save to database");
			location.href = "/workouts";
		};

		document.getElementById('btn-save').onclick = function() {
			if(passesValidation()) {
				var data = getFormData();
				data._id = undefined || sessionStorage.WorkoutId;
				socket.emit('saveWorkout', data);
			}
		};
	}

	function populateForm(data) {
		$('#date')[0].value = data.date;
		$('#name')[0].value = data.name;
		$('#details')[0].value = data.details;

	}

	function passesValidation() {
		// write validation code here for this form

		if( !document.getElementById('date').value ) {
			console.error("error: cannot save this workout until it has been given a date");
			alert("Please give this workout a DATE, and then try to save it again.");
			return false;
		}

		if( !document.getElementById('name').value ) {
			console.error("error: cannot save this workout until it has been given a name");
			alert("Please give this workout a NAME, and then try to save it again.");
			return false;
		}

		return true;
	}

	function getFormData() {
		var data = {};

		data.date = $('#date')[0].value;
		data.name = $('#name')[0].value;
		data.details = $('#details')[0].value;

		return data;
	}

	init();

})();

