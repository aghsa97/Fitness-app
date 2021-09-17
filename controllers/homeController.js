
const user_home = function(request, response) { 
	if (request.session.role === "client") {
		response.render('clientHome') 
	} else if (request.session.role === "trainer") {
		response.render('trainerHome') 
	} else{
		response.send('Please login to view this page!');
	}
	response.end();
}

module.exports = {
	user_home
}