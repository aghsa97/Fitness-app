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
			response.render(path.join(__dirname, "../views/clientViews/clientHome"), {firstName: firstName, friends: results})
		});


	} else if (request.session.role === "trainer") {
		//Here we might also need to check if the client has been verfied by the trainer. This has not been added to the database as of 2021-09-22
		var sql_client_list = 
		`select * from user
		join user_info on user.id = user_info.id
		where user_info.role = 'client'` 

		dbconnection.query(sql_client_list, function(error, results){
			if(error) throw error;
			response.render(path.join(__dirname, "../views/trainerViews/trainerHome"), {firstName: firstName, clients:results})
		});
		
	} else{
		response.redirect('/')
	}
};



module.exports = {
	user_home
}