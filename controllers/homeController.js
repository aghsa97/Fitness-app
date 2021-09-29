var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');


const user_home = function(request, response) { 

	var firstName = request.session.firstName;

	var db_id = request.session.dbId;
	
	if (request.session.role === "client") {
		var sql_friends = 
		`SELECT ui.firstname, ui.lastname, user.email, ui.role
		FROM user_info AS ui
		join user on user.id = ui.id
		WHERE user_id IN (SELECT r_friend_id FROM user_friends WHERE a_friend_id = ? and accepted = 1) 
		OR user_id IN (SELECT a_friend_id FROM user_friends WHERE r_friend_id = ? and accepted = 1)`

		dbconnection.query(sql_friends, [db_id, db_id ], function(error, results){
			if(error) throw error;
			response.render(path.join(__dirname, "../views/clientViews/clientHome"), {firstName: firstName, friends: results, role: request.session.role})
		});

	} else if (request.session.role === "trainer") {
		//Here we might also need to check if the client has been verfied by the trainer. This has not been added to the database as of 2021-09-22
		var sql_client_list = 
		`select * from user
		join user_info on user.id = user_info.id
		where user_info.role = 'client'`;

		var sql_workout_list = 
		`select w.id, w.name, uf.firstname, uf.lastname, u.email
		from workout as w
		join user_info as uf on w.user_id = uf.user_id
		join user as u on u.id = uf.user_id
		where w.creator_id = '?';`;

		var sql_pending_list =
		`SELECT u.id, i.firstname, i.lastname, u.email
		FROM user as u
		JOIN user_info as i on u.id = i.user_id
		WHERE u.verified = 0`

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