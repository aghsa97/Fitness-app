var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_session = function(request, response){

    if(request.body.date === undefined){
        response.redirect('/home') //Här måste man göra snyggare
        return;
    }

    var workout_id = request.body.workout_id;
    var completed = 0;

    var sql_insert_session = `
    INSERT INTO workout_session(workout_id, session_time, completed)
    VALUES(?, ?, ?)`

    if(Array.isArray(request.body.date) === false){
        dbconnection.query(sql_insert_session, [workout_id, request.body.date + ' 08:00:00', completed], function(error, results){
            if(error) throw error;
            response.redirect('/home');
            return;
        })
    } else {
        request.body.date.forEach(session_time => {
            console.log('kommer man hit?')
            session_time = session_time + ' 08:00:00'
            dbconnection.query(sql_insert_session, [workout_id, session_time, completed], function(error, results){
                if(error) throw error;
            })
        });
        response.redirect('/home');
    }
}

module.exports = {
    create_session
}