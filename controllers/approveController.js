var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const session = require('express-session');

const verify_or_delete_user = (request, response) => {
    var user_id = request.id;
    var action = request.action;
	var sql_update = 
	`UPDATE user
    SET verified = 1
	WHERE id = ?`
    var sql_select =
    `SELECT verified
    FROM user
    WHERE id = ?`
    var sql_delete =
    `DELETE
    FROM user
    WHERE id = ?`

    if(action === "verify") {
        if (id) {
            dbconnection.query(sql_update, [user_id], function(error, results, fields) {});

            dbconnection.query(sql_select, [user_id], function(error, results, fields) {

                if (results.id != 1) {
                    alert("Failed to verify user");
                }			
                
            });
        } else {
            //Shouldn't end up here, since id should always be included
            
        }
    } else if (action === "delete") {
        if(id) {
            dbconnection.query(sql_delete, [user_id], function(error, results, fields) {});
    
            dbconnection.query(sql_select, [user_id], function(error, results, fields) {
                if(results.id) {
                    alert("Failed to delete user");
                }
            })
        }
    } else {
        alert("Invalid action type");
    }
};



module.exports = {
    verify_or_delete_user
}