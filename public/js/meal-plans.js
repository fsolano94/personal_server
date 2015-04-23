(function() {
	var socket = io.connect();


	// define a socket event for a successful query
	socket.on('query-success', function(result) {
		console.log("query-success called!! Data: " + result.data);

		populatePage(result.data);
	});

	// define a socket event for an unsuccessful query
	socket.on('query-failure', function(result) {
		console.error("query-failure called... Data: " + result.data);
		alert('Sorry, but we failed to query the database.  Something has gone wrong.');
	});

	function init() {
		// emit a request to server-side logic to pull up all meal plans in the database
		socket.emit('get-meal-plans', {});

		// delete the MealPlanId property from the sessionStorage, if it exists
		if(sessionStorage.MealPlanId)	delete sessionStorage.MealPlanId;
	}

	function populatePage(documents) {
		// handle case with documents.length == 0

		var container = document.getElementById('meals_con');
		var num = 0;

		documents.forEach(function(doc) {
			// use core HTML to create a button that will link to our meal plan template
			var button = document.createElement("button");
			var linebreak = document.createElement("br");
			var linebreak2 = document.createElement("br");

			button.innerText = doc.title;
			button.id = 'plan_' + num;

			button.onclick = function() {
				sessionStorage.MealPlanId = doc._id;
				location.href = '/meal-plan';
			};


			container.appendChild(button);
			container.appendChild(linebreak);
			container.appendChild(linebreak2);
			num++;
		});
	}









	init();

})();

