var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_exercise = function(request, response){

    if(request.session.role === "trainer"){

        response.render(path.join(__dirname, "../views/trainerViews/createExercise"))
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
            response.redirect('/createexercise')
        })
    }
}

module.exports = {
    create_exercise,
    save_exercise
}