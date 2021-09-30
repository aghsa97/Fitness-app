var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');

const get_workout = function (request, response) {
    var sql_workout_list = 
		`select * from workout_session
		where workout_id = 1`;

        dbconnection.query(sql_workout_list, [request.session.dbId], function(error, workouts_results){
            if(error) throw error;
            response.render(path.join(__dirname, "../views/clientViews/clientHome"), {workouts:workouts_results, role: request.session.role})
        })
}

module.exports = {
    get_workout
}