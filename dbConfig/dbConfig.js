/*
This file is used to setup the database connection and share it with other files. 
Other files can access the database by importing this JS file. 
Might need to add this to a gitIgnore file, since everyone has different root-passwords.
*/

var mysql = require("mysql2");

var connection = {
	host     : 'localhost',
	user     : 'root',
	password : 'W@J&7VuE9he@aiP3#xg$',
	database : 'workout_db',
  connectionLimit: 5 
};

var dbconnection = mysql.createPool(
    connection
);

dbconnection.on('connection', function (connection) {

  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

module.exports = dbconnection;

