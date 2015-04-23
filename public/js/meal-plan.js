(function() {
	var socket = io.connect();

	// define a socket event for a successful query
	socket.on('query-success', function(result) {
		console.log("query-success called!! Data: " + result.data);

		populateForm(result.data);
	});

	// define a socket event for an unsuccessful query
	socket.on('query-failure', function(result) {
		console.error("query-failure called... Data: " + result.data);
		alert('Sorry, but we failed to pull up the meal plan from the database.  Something has gone wrong.');
	});

	// define a socket event for successfully saving this item (after clicking save)
	socket.on('saved-success', function(result) {
		console.log('successfully saved changes...');
		alert("This meal plan has been successfully saved and uploaded to the database");
		location.href = '/meal-plans';
	});

	// define a socket event for failing to save this item (after clicking save)
	socket.on('saved-failure', function(result) {
		console.error('Something went wrong, failed to save changes...');
		alert("This meal plan FAILED to be uploaded to the database... Sorry about that.");
	});

	function init() {
		setupEventHandlers();

		if(sessionStorage.MealPlanId) {
			// request the meal plan's information from the server
			socket.emit('get-meal-plan', {_id: sessionStorage.MealPlanId});
		}
	}

	function setupEventHandlers() {
		document.getElementById('btn-cancel').onclick = function() {
			console.log("Canceled new meal plan, did not save to database");
			location.href = "/meal-plans";
		};

		document.getElementById('btn-save').onclick = function() {
			if(passesValidation()) {
				var data = getFormData();
				socket.emit('save-meal-plan', data);
			}
		};
	}

	function populateForm(data) {
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		var numMeals = data[0].mealNames.length;

		if(data.length > 1) {
			console.error("error: received data for multiple meal plans when data for only one was expected.");
			alert("error: an error has occured");
		}

		data = data[0];

		document.getElementById('title').value = data.title;

		// populate meal names
		for(var i = 0; i < numMeals; i++) {
			$('#mealNames').find('input')[i].value = data.mealNames[i];
		}

		// populate meal info across the page
		for(var i = 0; i < days.length; i++) {
			var day = days[i];
			var id = '#' + day;

			for(var j = 0; j < numMeals; j++) {
				var val = data.meals[day][j] || "";
				$(id).find('textarea')[j].value = val;
			}
		}

	}

	function passesValidation() {
		// write validation code here for this form

		if( !document.getElementById('title').value ) {
			console.error("error: cannot save this meal plan until it has been given a title");
			alert("Please give this meal plan a title, and then try to save it again.");
			return false;
		}

		return true;
	}

	function getFormData() {
		var data = {};
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		var numMeals = $('#mealNames').children().length;

		// extract id and title properties
		data._id = sessionStorage.MealPlanId;
		data.title = document.getElementById('title').value;

		// extract meal names
		data.mealNames = [];
		for(var i = 0; i < numMeals; i++) {
			data.mealNames.push( $('#mealNames').find('input')[i].value );
		}

		// extract text for each meal
		data.meals = {};
		for(var i = 0; i < 7; i++) {
			var meals = [];
			var day = days[i];
			var id = '#' + day;

			for(var j = 0; j < numMeals; j++) {
				meals.push( $(id).find('textarea')[j].value )
			}

			data.meals[day] = meals;
		}

		return data;
	}

	init();

})();



