var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');


const user_friends = function(request, response) { 

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
			response.render(path.join(__dirname, "../views/clientViews/clientFriends"), {firstName: firstName, friends: results, role: request.session.role})
		});
    }
}

module.exports = {
	user_friends
}