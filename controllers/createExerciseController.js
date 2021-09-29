var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_exercise = function(request, response){

    if(request.session.role === "trainer"){
        response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role})
    } else{

        response.redirect('/');
    }
}

const save_exercise = function(request, response){

    if(request.session.role === "trainer"){

        var sql_insert_exercise = 
        `INSERT 
        INTO exercise (name, target_muscle, level, description) 
        VALUES(?, ?, ?, ?)` 

        dbconnection.query(sql_insert_exercise,[request.body.exercise_name, request.body.target_muscle, request.body.level, request.body.description], function(error, results){
            if(error) {
                if(error.errno === 1062){
                    message = "This exercise already exists!";
                    response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {message: message, role: request.session.role});   
                }
            } else {
                message = "Your exercise has been created succesfully.";
                response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {message: message, role: request.session.role});   
            }
        })
    }
}

module.exports = {
    create_exercise,
    save_exercise
}