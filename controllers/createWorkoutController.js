var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_workout = function(request, response){

    if (request.session.role === "trainer") {

        var sql_get_exercises = 
        `SELECT * 
        FROM exercise`;

        dbconnection.query(sql_get_exercises, function(error, results){
            response.render(path.join(__dirname, "../views/trainerViews/createWorkout"), {exercise:results, role: request.session.role })
        })

    } else {
        response.redirect('/')
    }
    
};

const save_workout = function(request, response){
    
    var sql_create_workout = 
    `INSERT 
    INTO workout(name, creator_id, level) 
    VALUES (?, ?, ?);`

    var sql_get_created_workout = `
    SELECT MAX(id) as id 
    FROM workout;` 

    var sql_add_workout_exercise = `
    INSERT 
    INTO workout_exercise (workout_id, exercise_id, workout_exercise.load, reps, workout_exercise.order) 
    VALUES (?, ?, ?, ?, ?);` 

    if(request.session.role === "trainer"){
        dbconnection.query(sql_create_workout, [request.body.workoutname, request.session.dbId, request.body.level], function(error, results){
            if(error) throw error;
            dbconnection.query(sql_get_created_workout, function(error, results){
                if(error) throw error;
                var created_workout_id = results[0].id;
                request.body.exercise.forEach(function(Object) {
                    console.log(Object)
                    dbconnection.query(sql_add_workout_exercise, [created_workout_id, Object.exercise, Object.weight, Object.reps, Object.order], function(error, results){
                        if(error) throw error;  
                    })
                });    
            });
        });
        response.redirect('/createworkout')
    };
}


module.exports = {
    create_workout,
    save_workout
}


