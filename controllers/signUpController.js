var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const registerUser = function (request, response) {
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
	var password = request.body.password;
    var email = request.body.email;
    var role = 'client';
    var query = `INSERT INTO accounts(firstName, lastName, password, email, role) VALUES (?,?,?,?,?);`;

    dbconnection.query(query, [firstName,lastName, password, email, role], function(error, results){

        //Add a try-catch block here when refactoring. 
        if (error) {
            if(error.errno === 1062){
                message = "This email already exists!";
                response.render(path.join(__dirname, "../views/sharedViews/signUp"), {message: message, firstName:firstName, lastName:lastName });   
            }
        } else {
            message = "Your account has been created succesfully.";
            response.render(path.join(__dirname, "../views/sharedViews/signUp"), {message: message});
        }
    });
};
 
const isUserLoggedIn = function(request, response){

	if(request.session.username){
		
		response.redirect('/');
		
	} else{
		response.render(path.join(__dirname, "../views/sharedViews/signUp"))
	} 
}

module.exports = {
	isUserLoggedIn,
    registerUser
}