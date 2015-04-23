( function() {
    var Schema = require('mongoose').Schema;

    var MealPlanSchema = new Schema({
		title: String,
		mealNames: [String],
		meals: {
			Monday: [String],
			Tuesday: [String],
			Wednesday: [String],
			Thursday: [String],
			Friday: [String],
			Saturday: [String],
			Sunday: [String]
		}
	});

	var WorkoutSchema = new Schema({
		date: String,
		name: String,
		details: String
	});


    module.exports = {
        'MealPlanSchema': MealPlanSchema,
		'WorkoutSchema': WorkoutSchema
    }


})(module);