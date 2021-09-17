var path = require('path');

const user_home = function(request, response) { 

	if (request.session.role === "client") {
		response.render(path.join(__dirname, "../views/clientViews/clientHome"))

	} else if (request.session.role === "trainer") {
		response.render(path.join(__dirname, "../views/trainerViews/trainerHome"))

	} else{
		response.redirect('/')
	}
	response.end();
}

module.exports = {
	user_home
}

