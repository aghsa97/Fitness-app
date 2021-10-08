var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');

const friend_home = function(request, response) { 
	var sql_friend_check =
	`SELECT user.id
	FROM user_info AS ui
	JOIN user on user.id = ui.id
	WHERE user_id IN (SELECT r_friend_id FROM user_friends WHERE a_friend_id = ? and accepted = 1) 
	OR user_id IN (SELECT a_friend_id FROM user_friends WHERE r_friend_id = ? and accepted = 1)`

	dbconnection.query(sql_friend_check, [request.session.dbId, request.session.dbId], function(error, friends) {
		if(error) throw error;
		const friend_list = [];
		friends.forEach(function(str){
			friend_list.push(JSON.parse(JSON.stringify(str)).id)
		})
		if(!request.session.loggedin || !friend_list.includes(parseInt(request.params.id))) {
			response.redirect('../views/sharedViews/404');
		}
		
	})
	
	if (request.session.role === "client") {
		var sql_friends = 
		`SELECT user.id, ui.firstname, ui.lastname, user.email, ui.role
		FROM user_info AS ui
		join user on user.id = ui.id
		WHERE user_id IN (SELECT r_friend_id FROM user_friends WHERE a_friend_id = ? and accepted = 1) 
		OR user_id IN (SELECT a_friend_id FROM user_friends WHERE r_friend_id = ? and accepted = 1)`

		var sql_workout_list = 
		`select * from workout_session
		where workout_id = ?`;

		var sql_client_upcoming_workouts =
        `SELECT session_time, name, user_info.firstname, user_info.lastname, level, workout_session.id
        FROM WORKOUT_SESSION
        JOIN WORKOUT ON workout_session.WORKOUT_ID = WORKOUT.ID
        JOIN USER_INFO ON WORKOUT.CREATOR_ID = USER_INFO.USER_ID
        WHERE WORKOUT.USER_ID = ?
        AND SESSION_TIME >= SYSDATE();`

		var sql_friend_personal_info =
		`SELECT user_id, firstname, lastname, weight, height, gender, role
		FROM user_info
		WHERE user_id = ?`

		dbconnection.query(sql_friend_personal_info, [request.params.id], function(error, personal_info) {
			if(error) throw error;
			dbconnection.query(sql_client_upcoming_workouts, [request.params.id], function(error, upcoming_results){
				if(error) throw error;
				dbconnection.query(sql_workout_list, [request.params.id], function(error, workouts_results){
					if(error) throw error;
					var workout_list = workouts_results;
					dbconnection.query(sql_friends, [request.params.id, request.params.id ], function(error, results){
						if(error) throw error;
						response.render(path.join(__dirname, "../views/clientViews/friendPage"), { personal_info: personal_info, upcoming: upcoming_results, friends: results, workout_list: workout_list, role: request.session.role})
					})
				})
			})
		});	

	
		
	} else{
		response.redirect('/')
	}
};



module.exports = {
	friend_home
}