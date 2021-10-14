var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');

const user_home = function(request, response) { 

	var firstName = request.session.firstName;

	var db_id = request.session.dbId; //this is the logged in users user id
	
	if (request.session.role === "client") {

		var sql_friends = 
		`SELECT user.id, ui.firstname, ui.lastname, user.email, ui.role
		FROM user_info AS ui
		join user on user.id = ui.id
		WHERE user_id IN (SELECT r_friend_id FROM user_friends WHERE a_friend_id = ? and accepted = 1) 
		OR user_id IN (SELECT a_friend_id FROM user_friends WHERE r_friend_id = ? and accepted = 1)`

		var sql_workout_session_list = 
		`select * from workout_session
		where workout_id = ?`;

		var sql_workout_list = 
		`select * from workout
		where creator_id = ? or user_id = ?` 

		var sql_client_upcoming_workouts =
        `SELECT session_time, name, user_info.firstname, user_info.lastname, level, workout_session.id
        FROM WORKOUT_SESSION
        JOIN WORKOUT ON workout_session.WORKOUT_ID = WORKOUT.ID
        JOIN USER_INFO ON WORKOUT.CREATOR_ID = USER_INFO.USER_ID
        WHERE WORKOUT.USER_ID = ?
        AND SESSION_TIME >= SYSDATE();`

       
          dbconnection.query(sql_client_upcoming_workouts, [db_id], function(error, upcoming_results){
                if(error) throw error;
                dbconnection.query(sql_workout_session_list, [db_id], function(error, workouts_session_results){
                    if(error) throw error;
                    var workout_session_list = workouts_session_results;
                    dbconnection.query(sql_friends, [db_id, db_id ], function(error, results){
                        if(error) throw error;
                        var friends = results;
                        dbconnection.query(sql_workout_list, [db_id, db_id], function(error, results){
                            if(error) throw error;
                            var workout_list = results;
                            response.render(path.join(__dirname, "../views/clientViews/clientHome"), 
                            {firstName: firstName, workout_list: workout_list, upcoming: upcoming_results, friends: friends, workout_session_list: workout_session_list, role: request.session.role})

                        })

                    })
                })
           
		});

        
	} else if (request.session.role === "trainer") {
		var sql_client_list = 
		`select * from user
		join user_info on user.id = user_info.user_id
		where user_info.role = 'client'
		and user.verified = 1`;

		var sql_workout_list = 
		`select * from workout
		where creator_id = ?` 

		var sql_pending_list =
		`SELECT u.id, i.firstname, i.lastname, u.email
		FROM user as u
		JOIN user_info as i on u.id = i.user_id
		WHERE u.verified = 0
		AND i.role = 'client'`

		dbconnection.query(sql_client_list, function(error, client_results){
			if(error) throw error;
			dbconnection.query(sql_workout_list, [request.session.dbId], function(error, workouts_results){
				if(error) throw error;
				dbconnection.query(sql_pending_list, function(error, pending_results) {
					if(error) throw error;
					response.render(path.join(__dirname, "../views/trainerViews/trainerHome"), {firstName: firstName, clients:client_results, workouts:workouts_results, role: request.session.role, pending: pending_results})
				})
			})
		});
		
	} else{
		response.redirect('/')
	}
};



module.exports = {
	user_home
}