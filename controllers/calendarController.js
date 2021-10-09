var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');

const get_month_workout_sessions = function (request, response) {
    var year_month = request.params.year_month;
    
    var the_year = year_month.split("-")[0];
    var the_month = year_month.split("-")[1];
    
    console.log(the_year + " - " + the_month);
    
    var firstDay = new Date(parseInt(the_year), parseInt(the_month)-1, 1);
    var lastDay = new Date(parseInt(the_year), parseInt(the_month), 0);
    
    console.log(firstDay);
    console.log(lastDay);

    var sql_workout_session_list = 
        `SELECT 
            DATE_FORMAT(ws.session_time, '%Y-%m-%d') AS session_date, 
            ws.id 
        FROM 
            workout_session AS ws, 
            workout AS w 
        WHERE 
            (ws.session_time BETWEEN ? AND ? ) 
            AND 
            w.id = ws.workout_id 
            AND 
            w.user_id = ?`;

        dbconnection.query(sql_workout_session_list, [firstDay.toISOString().split('T')[0], lastDay.toISOString().split('T')[0], request.session.dbId], function(error, workout_session_results){
            if(error) {
                console.log(error);
            }
            response.json(workout_session_results)
        })
    
}

const get_workout_session = function (request, respons) {
    var session_id = request.params.session_id;
}

module.exports = {
    get_month_workout_sessions,
    get_workout_session
}