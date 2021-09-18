var path = require('path');

const user_home = function(request, response) { 

	var firstName = request.session.firstName;

	if (request.session.role === "client") {
		
		response.render(path.join(__dirname, "../views/clientViews/clientHome"), {firstName: firstName})

	} else if (request.session.role === "trainer") {
		response.render(path.join(__dirname, "../views/trainerViews/trainerHome"), {firstName: firstName})

	} else{
		response.redirect('/')
	}
	response.end();
}

module.exports = {
	user_home
}

