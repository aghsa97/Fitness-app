var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_session = function(request, response){
    var workout_id = request.body.workout_id;
    var completed = 0;

    var sql_insert_session = `
    INSERT INTO workout_session(workout_id, session_time, completed)
    VALUES(?, ?, ?)`

    request.body.date.forEach(session_time => {

        session_time = session_time + ' 08:00:00'

        dbconnection.query(sql_insert_session, [workout_id, session_time, completed], function(error, results){
            if(error) throw error;
        })
    });
    response.redirect('/home');
}

module.exports = {
    create_session
}