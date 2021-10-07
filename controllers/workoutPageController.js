var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { request } = require('express');

const show_workout = function (request, response) {
    if(!request.session.loggedin) {
        response.redirect('../views/sharedViews/404');
    }



    var sql_workout_content =
    `SELECT w.name as wname, e.name, e.description, we.e_load, we.e_reps, we.e_order
    FROM workout_session as ws
    JOIN workout_exercise as we ON ws.workout_id = we.workout_id
    JOIN workout as w ON ws.workout_id = w.id
    JOIN exercise as e ON we.exercise_id = e.id
    WHERE ws.id = ?`

    dbconnection.query(sql_workout_content, [request.params.id], function(error, results){
        if(error) throw error;
        var workout_info = results;
        response.render(path.join(__dirname, "../views/sharedViews/workoutPage"), { role: request.session.role, workout_info: workout_info })
    })
}

module.exports = {
    show_workout
}