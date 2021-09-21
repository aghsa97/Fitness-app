var path = require('path');

const user_home = function(request, response) { 

	var firstName = request.session.firstName;
	/*Potentiell lösning för att rendera olika knappar beroende på inloggning
	var role = request.session.role; */

	if (request.session.role === "client") {
		/*Skicka med role som parameter till redirecten, och rendera olika knappar beroende på rollen */
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