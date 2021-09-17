var mysql = require('mysql2');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'W@J&7VuE9he@aiP3#xg$',
	database : 'node-test'
});

const user_login = (request, response) => {
    var username = request.body.username;
	var password = request.body.password;

	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
                request.session.id = results[0].id;
                request.session.role = results[0].role;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		//Will this ever be reached? The html makes these fields required anyways, so they cant be empty.
		response.send('Please enter Username and Password!');
		response.end();
	}
};

const user_logout = function(request, response){
	request.session.destroy();
    response.redirect('/');
}

module.exports = {
    user_login,
	user_logout
}