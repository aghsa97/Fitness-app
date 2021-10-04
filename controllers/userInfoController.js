var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const get_user_info = function(request,response){

    if(request.session.role === "trainer" | request.session.role === "client" ){
        var current_user_info = 
		`SELECT * FROM user_info
        WHERE user_id = ?`;

        dbconnection.query(current_user_info, [request.session.dbId], function(error, results){
            if(error) throw error;
            response.render(path.join(__dirname, "../views/sharedViews/userinfo"), {role: request.session.role, info: results});  
        })
    } else{
        response.redirect('/home');
    }
}

const save_user_info = function(request, response){

    if(request.session.role === "trainer" | request.session.role === "client" ){

        var update_user_info = 
		`UPDATE user_info
        SET firstname = ?, lastname = ?, weight = ?, height = ?, gender = ?
        where user_id = ?`;

        dbconnection.query(update_user_info, 
            [request.body.firstname, request.body.lastname, request.body.weight, request.body.height, request.body.gender, request.session.dbId], function(error, results){
            if(error) throw error;
            response.redirect('/userinfo')
        })
    } 
}

module.exports = {
    get_user_info, 
    save_user_info
}