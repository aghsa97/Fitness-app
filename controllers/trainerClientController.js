var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { request } = require('express');

const client_info = function(request, response) { 

	if (request.session.role === "trainer") {

        var sql = 
        `select * 
        from user
        join user_info on user.id = user_info.id
        where user_info.id = ?` 

        dbconnection.query(sql, [request.params.id], function(error, results){
            if(error) throw error;
            response.render(path.join(__dirname, "../views/trainerViews/clientInfo"), {info: results})
        });

	} else{
		response.redirect('/')
	}
};

module.exports = {
    client_info
}