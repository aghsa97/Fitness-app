var dbconnection = require('../dbConfig/dbConfig');
var path = require('path');
const { json } = require('express');
const { chownSync } = require('fs');

/*
Add check to see if the user is logged in to access these pages.
Ive noticed some weird errors when the server reboots and the page does not redirect the user
*/
const get_month_workout_sessions = function (request, response) {
    var year_month = request.params.year_month;
    var the_year = year_month.split("-")[0];
    var the_month = year_month.split("-")[1];
    var firstDay = new Date(parseInt(the_year), parseInt(the_month)-1, 1);
    var lastDay = new Date(parseInt(the_year), parseInt(the_month), 0);

    var sql_workout_session_list = 
        `SELECT 
            DATE_FORMAT(ws.session_time, '%Y-%m-%d') AS session_date, 
            ws.id 
        FROM 
            workout_session AS ws, 
            workout AS w 
        WHERE 
            (ws.session_time BETWEEN ? AND ? ) 
            AND 
            w.id = ws.workout_id 
            AND 
            w.user_id = ?`;

        dbconnection.query(sql_workout_session_list, [firstDay.toISOString().split('T')[0], lastDay.toISOString().split('T')[0], request.session.dbId], function(error, workout_session_results){
            if(error) {
                console.log(error);
            }
            response.json(workout_session_results)
        })
    
}

const get_workout_session = function (request, response) {
   
    var session_id = request.params.session_id

    var sql_session_info = 
    `select ws.id as workout_session_id, 
    ws.session_time as workout_session_date, 
    ws.completed workout_session_completed, 
    w.name as workout_name, 
    w.id as workout_id
    from workout_session as ws
    join workout as w on w.id = ws.workout_id
    where ws.id = ?`

    dbconnection.query(sql_session_info, [session_id], function(error, results){
        if(error) throw error;
        response.json(results)
    })
}

const complete_workout_session = function(request, response) {

    var sql_insert_session_note = `
    INSERT INTO session_note(session_id, user_id, parent_id, text)
    VALUES(?, ?, ?, ?)`

    var sql_complete_session= `
    update workout_session
    set completed = 1
    where id = ?`
    
    dbconnection.query(sql_insert_session_note,[request.body.session_id, request.session.dbId, null, request.body.text], function(error, results){
        if(error) throw error;
        dbconnection.query(sql_complete_session,[request.body.session_id], function(error, results){
            if(error) throw error;    
            response.sendStatus(200);
        })
    })
}

const get_latest_workout_note = function(request, response){

    var sql_get_latest_note = 
    `SELECT * FROM session_note
    where id = 
    (select max(id) from session_note where session_id = ?)`

    dbconnection.query(sql_get_latest_note, [request.params.session_id], function(error, results){
        if(error) throw results;
        response.json(results)
    })
}

const edit_workout_note = function(request, response){
 
    var sql_get_parent_note = `
    SELECT * FROM session_note
    where id = 
    (select max(id) from session_note where session_id = ?)`

    var sql_create_note = `
    insert into session_note (session_id, user_id, parent_id, text)
    values(?,?,?,?)`

    var session_id = JSON.parse(JSON.stringify(request.body)).session_id;
    var note_text = JSON.parse(JSON.stringify(request.body)).text;

    dbconnection.query(sql_get_parent_note, [session_id], function(error, results){
        if(error) throw error;
        var parent_note = results[0].id;
        var user_id = results[0].user_id;
        dbconnection.query(sql_create_note, [session_id, user_id, parent_note, note_text], function(error, results){
            if(error) throw error;
            response.sendStatus(200);
        })
    })    
}

module.exports = {
    get_month_workout_sessions,
    get_workout_session,
    complete_workout_session,
    edit_workout_note,
    get_latest_workout_note
}