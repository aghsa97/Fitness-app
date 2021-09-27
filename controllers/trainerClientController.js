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
        `SELECT DISTINCT * 
        FROM workout 
        WHERE creator_id = ?
        group by name;` 

        var sql_client_workouts = 
        `SELECT *
        FROM workout
        WHERE user_id = ?`

        dbconnection.query(sql_user_info, [request.params.id], function(error, results){
            if(error) throw error;
            var user_info = results;
            dbconnection.query(sql_trainer_workouts, [request.session.dbId], function(error, results){
                if(error) throw error;
                var trainer_workouts = results;
                dbconnection.query(sql_client_workouts, [request.params.id],function(error, results){
                    if(error) throw error;
                    var client_workouts = results;
                    response.render(path.join(__dirname, "../views/trainerViews/clientInfo"), 
                    {info: user_info, trainer_workouts: trainer_workouts, client_workouts: client_workouts, client_id: request.params.id, role: request.session.role })
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

module.exports = {
    client_info,
    assign_workout
}