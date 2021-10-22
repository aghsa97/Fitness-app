var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { response } = require('express');

const create_exercise = function(request, response){

    var sql_exercise_list = `
    SELECT * FROM exercise WHERE create_user_id IS NULL;`

    var sql_target_muscles = `
    SELECT DISTINCT target_muscle
    FROM exercise;`

    var sql_client_ex = `SELECT * FROM exercise WHERE create_user_id = ?;`

    var page_title = "CREATE EXERCISE"

        
    dbconnection.query(sql_target_muscles, function(error, results){
        if(error) throw error;
        var target_muscle = results;
        if(request.session.role === "client"){
            dbconnection.query(sql_client_ex, [request.session.dbId] ,function(error, results){
            if(error) throw error;
            var exercise = results;
            response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, target_muscle: target_muscle, exercise: exercise, create_title: page_title})
            }) 
        }
        else if(request.session.role === "trainer"){
            dbconnection.query(sql_exercise_list, function(error, results){
            if(error) throw error;
            var exercise = results;
            response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, target_muscle: target_muscle, exercise: exercise, create_title: page_title})
            })
        }
    })

}


const save_exercise = function(request, response){

    if(request.session.role === "trainer"){

        var sql_insert_exercise = 
        `INSERT 
        INTO exercise (name, target_muscle, level, description) 
        VALUES(?, ?, ?, ?);` 

        dbconnection.query(sql_insert_exercise,[request.body.exercise_name, request.body.target_muscle, request.body.level, request.body.description], function(error, results){
            if(error) throw error;
            response.redirect('/createexercise')
        })
    }
    else {
        var sql_insert_created = `INSERT INTO exercise (name, create_user_id, target_muscle, level, description) VALUES(?,?,?,?,?);`

        dbconnection.query(sql_insert_created,[request.body.exercise_name, request.session.dbId, request.body.target_muscle, request.body.level, request.body.description], function(error, results){
            if(error) throw error;
            response.redirect('/createexercise')
        })
    }
}

const edit_exercise = function(request, response) {

    var sql_get_exercise = `
    SELECT * FROM exercise
    where id = ?` 

    var page_title = "EDIT EXERCISE"

    var sql_target_muscles = `
    SELECT DISTINCT target_muscle
    FROM exercise;`

    var sql_exercise_list = `
    SELECT * FROM exercise WHERE create_user_id IS NULL;`

    var sql_client_ex = `SELECT * FROM exercise WHERE create_user_id = ?;`


    dbconnection.query(sql_get_exercise,[request.params.id], function(error, results){
        if(error) throw error; 
        var requested_exercise = results;
        dbconnection.query(sql_target_muscles, function(error, results){
            if(error) throw error;
            var target_muscle = results;
            if(request.session.role === "client") {
                dbconnection.query(sql_client_ex, [request.session.dbId] ,function(error, results){
                    if(error) throw error;
                    var exercise = results;
                    response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title,target_muscle: target_muscle, requested_exercise: requested_exercise, exercise: exercise})      
                 })
            }
            else{
                dbconnection.query(sql_exercise_list, function(error, results){
                    if(error) throw error;
                    var exercise = results;
                    response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title, requested_exercise: requested_exercise, exercise: exercise, target_muscle: target_muscle});
                })
            }
              
        })
    })
}

const save_edited_exercise = function(request, response){

    var sql_save_edited_exercise = `
    UPDATE exercise
    set name = ?, target_muscle = ?, level = ?, description = ?
    where exercise.id = ?`
    var sql_get_exercise = `
    SELECT * FROM exercise
    where id = ?` 

    var sql_exercise_list = `
    SELECT * FROM exercise WHERE create_user_id IS NULL;`

    var sql_client_ex = `SELECT * FROM exercise WHERE create_user_id = ?;`

    var page_title = "EDIT EXERCISE"

    var message = "Your exercise has been edited!"

    dbconnection.query(sql_save_edited_exercise, [request.body.exercise_name, request.body.target_muscle, request.body.level, request.body.description, request.params.id], function(error, results){
            if(error) throw error;
            dbconnection.query(sql_get_exercise, [request.params.id], function(error, results){
                if(error) throw error;
                var requested_exercise = results;
                if(request.session.role === "client"){
                    dbconnection.query(sql_client_ex, [request.session.dbId],function(error, results){
                        if(error) throw error;
                        var exercise_list = results;
                        response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title, requested_exercise: requested_exercise, exercise: exercise_list, message:message});
                    })
                }
                else {
                    dbconnection.query(sql_exercise_list, function(error, results){
                        if(error) throw error;
                        var exercise_list = results;
                        response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title, requested_exercise: requested_exercise, exercise: exercise_list, message:message});
                    })
                }
            })
    })
}

const delete_exercise = function(request, response) {


    var sql_delete_workout_ex = `DELETE FROM workout_exercise WHERE exercise_id = ?`
    var sql_delete_exercise = `DELETE FROM exercise WHERE id = ?`


    dbconnection.query(sql_delete_workout_ex, [request.params.id], function(error, results){
        if(error) throw error;
        dbconnection.query(sql_delete_exercise, [request.params.id], function(error, results){
            if(error) throw error;
            response.redirect('/createexercise');
        })
            
    })
    

}

module.exports = {
    create_exercise,
    save_exercise,
    edit_exercise,
    save_edited_exercise,
    delete_exercise
}