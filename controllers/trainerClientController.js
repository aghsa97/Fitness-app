var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { request } = require('express');

const client_info = function(request, response) { 

	if (request.session.role === "trainer") {

        var sql_user_info = 
        `SELECT * 
        FROM user
        JOIN user_info ON user.id = user_info.id
        WHERE user_info.id = ?` 

        var sql_trainer_workouts =  
        `SELECT * 
        FROM workout 
        WHERE creator_id = ?
        AND user_id is null` 

        var sql_client_workouts = 
        `SELECT *
        FROM workout
        WHERE user_id = ?
        AND creator_id = ?`

        var sql_client_completed_session = `
        SELECT session_time, name, user_info.firstname, user_info.lastname, level, workout_session.id
        FROM workout_session
        JOIN workout ON workout_session.workout_id = workout.id
        JOIN user_info ON workout.creator_id = user_info.user_id
        WHERE workout.user_id = ?
        AND workout_session.completed = 1`

        dbconnection.query(sql_user_info, [request.params.id], function(error, results){
            if(error) throw error;
            var user_info = results;
            dbconnection.query(sql_trainer_workouts, [request.session.dbId], function(error, results){
                if(error) throw error;
                var trainer_workouts = results;
                dbconnection.query(sql_client_workouts, [request.params.id, request.session.dbId],function(error, results){
                    if(error) throw error;
                    var client_workouts = results;
                    dbconnection.query(sql_client_completed_session, [request.params.id],function(error, results){
                        var completed_sessions = results;
                        response.render(path.join(__dirname, "../views/trainerViews/clientInfo"), 
                        {info: user_info, trainer_workouts: trainer_workouts, client_workouts: client_workouts, client_id: request.params.id, role: request.session.role, completed_sessions: completed_sessions })
                    })
                })
            })
        });

	} else{
		response.redirect('/')
	}
};

const assign_workout = function(request, response){

    if (request.session.role === "trainer") {

        var sql_copy_workout = 
        `CALL copy_workout_to_user(?,?)`

        dbconnection.query(sql_copy_workout, [request.body.workout, request.body.user_id], function(error, results){
            if(error) throw error;
            response.redirect(`/client/${request.body.user_id}`)
        })
    }
}

const completed_sessions_info = function(request, response){
    
    if(request.session.role === "trainer"){

        var session_id = request.params.session_id

        var sql_get_completed_session_info = `
        SELECT e.target_muscle as target_muscle, ws.id as session_id, ws.session_time as session_time, w.name as wname, e.name as ename, e.description as edescription, we.e_load as eload, we.e_reps as ereps, we.e_order as eorder
        FROM workout_session as ws
        JOIN workout_exercise as we ON ws.workout_id = we.workout_id
        JOIN workout as w ON ws.workout_id = w.id
        JOIN exercise as e ON we.exercise_id = e.id
        WHERE ws.id = ?
        order by e_order ASC;` 

        dbconnection.query(sql_get_completed_session_info, [session_id], function(error, results){
            if(error) throw error;
            response.json(results);
        })
    }
}

const get_latest_workout_note = function(request, response){

    if(request.session.role === "trainer"){

        var sql_get_latest_note = 
        `SELECT * FROM session_note
        where id = 
        (select max(id) from session_note where session_id = ?)`

        dbconnection.query(sql_get_latest_note, [request.params.session_id], function(error, results){
            if(error) throw error;
            response.json(results)
        })
    }
}

const get_session_workout = function(request, response){

    if(request.session.role === "trainer"){

        var sql_get_latest_note = 
        `select  
        ws.id as session_id, ws.session_time as session_time, w.id as w_id, w.name as w_name  
        from workout_session as ws
        join workout as w on w.id  = ws.workout_id
        where ws.id = ?;`

        dbconnection.query(sql_get_latest_note, [request.params.session_id], function(error, results){
            if(error) throw error;
            response.json(results)
        })
    }
}

const get_workout_session_exercise = function(request, response){

    if(request.session.role === "trainer"){

        var sql_get_latest_note = 
        `select 
        e.target_muscle as target_muscle, w.name as wname, e.name as ename, e.description as edescription, we.e_load as eload, we.e_reps as ereps, we.e_order as eorder
        from workout as w
        join workout_exercise as we on w.id  = we.workout_id
        join exercise as e on e.id = we.exercise_id
        where w.id = ?
        order by eorder;`

        dbconnection.query(sql_get_latest_note, [request.params.workout_id], function(error, results){
            if(error) throw error;
            response.json(results)
        })
    }
}

module.exports = {
    client_info,
    assign_workout,
    completed_sessions_info,
    get_latest_workout_note,
    get_workout_session_exercise,
    get_session_workout
}