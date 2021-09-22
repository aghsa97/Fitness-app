var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const session = require('express-session');

const user_login = (request, response) => {
    var email = request.body.email;
	var password = request.body.password;
	var sql = 
	`SELECT * 
	FROM user join user_info 
	ON user.id = user_info.user_id 
	WHERE email = ? AND password = ?`

	if (email && password) {
		dbconnection.query(sql, [email, password], function(error, results, fields) {

			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.dbId = results[0].id;
				request.session.email = email;
				request.session.firstName = results[0].firstname;
				request.session.lastName = results[0].lastname;
				request.session.weight = results[0].weight; 
				request.session.height = results[0].height; 
				request.session.gender = results[0].gender; 
                request.session.role = results[0].role;
				response.redirect('/home');
			} else {
				message = 'Incorrect Email and/or Password!';
				response.render(path.join(__dirname, "../views/sharedViews/login"), {message: message});
			}			
			
		});
	} else {
		//Will this ever be reached? The html makes these fields required anyways, so they cant be empty.
		response.send('Please enter Email and Password!');
		
	}
};

const user_logout = function(request, response){
	request.session.destroy();
    response.redirect('/');
}

const isUserLoggedIn = function(request, response){

	if(request.session.email){
		
		response.redirect('/');
		
	} else{
		response.render(path.join(__dirname, "../views/sharedViews/login"))
	} 
}

module.exports = {
    user_login,
	user_logout, 
	isUserLoggedIn
}