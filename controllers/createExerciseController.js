var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { response } = require('express');

const create_exercise = function(request, response){

    var sql_exercise_list = `
    SELECT * FROM exercise;`

    var page_title = "CREATE EXERCISE"

    if(request.session.role === "trainer"){

        dbconnection.query(sql_exercise_list, function(error, results){
            if(error) throw error;
            response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, exercise: results, create_title: page_title})
        })

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

    dbconnection.query(sql_get_exercise,[request.params.id], function(error, results){
        if(error) throw error;
        var requested_exercise = results;
        response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title, requested_exercise: requested_exercise});  
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

    var page_title = "EDIT EXERCISE"

    var message = "Your exercise has been edited!"

    dbconnection.query(sql_save_edited_exercise, [request.body.exercise_name, request.body.target_muscle, request.body.level, request.body.description, request.params.id], function(error, results){
            if(error) throw error;
            dbconnection.query(sql_get_exercise, [request.params.id], function(error, results){
                if(error) throw error;
                var requested_exercise = results;
                response.render(path.join(__dirname, "../views/trainerViews/createExercise"), {role: request.session.role, edit_title: page_title, requested_exercise: requested_exercise, message:message});
            })
        })
}

module.exports = {
    create_exercise,
    save_exercise,
    edit_exercise,
    save_edited_exercise
}