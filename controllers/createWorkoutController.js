var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');

const create_workout = function(request, response){

    if (request.session.role === "trainer" | request.session.role === "client") {

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

    // We have to discuss how we are supposed to re_use this for the client aswell. 

    var sql_create_workout = 
    `INSERT 
    INTO workout(name, creator_id, level) 
    VALUES (?, ?, ?);`

    var sql_get_created_workout = `
    SELECT MAX(id) as id 
    FROM workout;` 

    var sql_add_workout_exercise = `
    INSERT 
    INTO workout_exercise (workout_id, exercise_id, e_load, e_reps, e_order) 
    VALUES (?, ?, ?, ?, ?);` 

    var sql_assign_workout_user = `
    UPDATE workout
    SET user_id = ?
    WHERE workout.id = ?` 

    if(request.session.role === "trainer" | request.session.role === "client"){
        dbconnection.query(sql_create_workout, [request.body.workoutname, request.session.dbId, request.body.level], function(error, results){
            if(error) throw error;
            dbconnection.query(sql_get_created_workout, function(error, results){
                if(error) throw error;
                var created_workout_id = results[0].id;
                request.body.exercise.forEach(function(Object) {
                    dbconnection.query(sql_add_workout_exercise, [created_workout_id, Object.id, Object.load, Object.reps, Object.order], function(error, results){
                        if(error) throw error;  
                    })
                });    

                if(request.body.user_id !== "" && request.session.role === "trainer"){
                    dbconnection.query(sql_assign_workout_user, [request.body.user_id, created_workout_id], function(error, results){
                        if(error) throw error;
                    }) 

                } else if (request.session.role === "client"){
                    console.log('test')
                    dbconnection.query(sql_assign_workout_user, [request.session.dbId, created_workout_id], function(error, results){
                        if(error) throw error;

                })
            }  
            });
        });
        response.redirect('/createworkout')
    };
    
}

const edit_workout = function(request, response){

    if(request.session.role === "trainer" | request.session.role === "client"){

        var workout_id = request.params.id;

        var sql_get_exercises = 
        `SELECT * 
        FROM exercise`;

        var sql_workout_to_edit = 
        `SELECT 
        workout_exercise.id as workout_exercise_id,
        workout_exercise.e_load,
        workout_exercise.e_reps,
        workout_exercise.e_order,

        workout.id as workout_id,
        workout.name as workout_name,
        workout.level as workout_level,
        workout.user_id as workout_user_id,

        exercise.id as exercise_id,
        exercise.name as exercise_name,
        exercise.target_muscle as exercise_muscle

        FROM workout_exercise
        join workout on workout.id = workout_exercise.workout_id
        join exercise on exercise.id = workout_exercise.exercise_id
        where workout_id = ?`

        dbconnection.query(sql_workout_to_edit, [workout_id], function(error, results){
            if(error) throw error;
            var workout = results;
            dbconnection.query(sql_get_exercises, function(error, results){
                var exercises = results;
                if(error) throw error;
                response.render(path.join(__dirname, "../views/trainerViews/createWorkout"), {exercise:exercises, workout: workout, role: request.session.role})
            })
        })
    }
}


module.exports = {
    create_workout,
    save_workout,
    edit_workout
}


