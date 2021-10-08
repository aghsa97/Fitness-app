var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const registerUser = function (request, response) {
	var password = request.body.password;
    var email = request.body.email;

    var role = 'client';
    var sql_insert = 
    `INSERT INTO user(email, hash) 
    VALUES (?,?);`;

    dbconnection.query(sql_insert, [email, password], function(error, results){

        //Add a try-catch block here when refactoring. 
        if (error) {
            if(error.errno === 1062){
                message = "This email already exists!";
                response.render(path.join(__dirname, "../views/sharedViews/signUp"), {message: message, email:email, role:request.session.role});   
            }
        } else {
            //This is not very pretty since i do queries inside queries. Maybe there is an easier way to write this?
            dbconnection.query('SELECT id from user WHERE email = ?', [email], function(error, results){
                if(error) throw error;
                var user_id = results[0].id;
                dbconnection.query('INSERT INTO user_info(user_id, role) VALUES (?, ?)', [user_id, role], function(error, results){
                    if(error) throw error;
                    })
                })
            message = "Your account has been created succesfully.";
            response.render(path.join(__dirname, "../views/sharedViews/signUp"), {message: message, role: request.session.role});
        }
    });
};
 
const isUserLoggedIn = function(request, response){

	if(request.session.email){
		
		response.redirect('/');
		
	} else{
		response.render(path.join(__dirname, "../views/sharedViews/signUp"), {role:request.session.role})
	} 
}
module.exports = {
	isUserLoggedIn,
    registerUser
}