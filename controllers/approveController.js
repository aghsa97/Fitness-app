var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const session = require('express-session');

const verify_or_delete_user = (request, response) => {

    var user_id = request.body.user_id;
    var action = request.body.action;

	var sql_update = 
	`UPDATE user
    SET verified = 1
	WHERE id = ?`

    var sql_delete =
    `DELETE
    FROM user
    WHERE id = ?`

    var sql_delete_user_info =
    `DELETE
    FROM user_info
    WHERE user_id = ?`

    if(action === "Verify") {
            dbconnection.query(sql_update, [user_id], function(error, results, fields) {
                if(error) throw error;
                response.redirect('/home');
            });

    } else if (action === "Delete") {
            dbconnection.query(sql_delete_user_info, [user_id], function(error, results, fields) {
                if(error) throw error;
                dbconnection.query(sql_delete, [user_id], function(){
                    if(error) throw error;
                    response.redirect('/home'); 
                })
            });
            
    } else {
        alert("Invalid action type");
    }

};



module.exports = {
    verify_or_delete_user
}