//Part of the code which is never used

var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');

const get_user_day_workout = function(request, response) { 
    
	var db_id = request.session.dbId;
    var workout_date = request.params.workout_date;
    var sql_todays_workout = `call get_date_user_workout(${db_id}, "${workout_date}")`;
    
    dbconnection.query(sql_todays_workout, [], function(error, date_workout_result){
        if(error) {
            console.log(error + ' in workoutController');
        }
        response.json(date_workout_result)
    })
}

module.exports = {
    get_user_day_workout
}