const session = require("express-session");
const nodemon = require("nodemon");
const { isUserLoggedIn } = require("../controllers/loginController");
const { post } = require("../routes/routes");

function render_calender(target_div_name, set_date) {
    var date;
    if(set_date == 0) {
        date = new Date();
    } else {
        date = set_date;
        
    }
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var current_day = new Date(date.getFullYear(), date.getMonth(), 1);
    var generated_html = generate_cal_month_header(date);
    var day_counter = 0;
    var break_counter = 0;
    
    for(let fill_day = 0; fill_day < firstDay.getDay()-1; fill_day++) {
        generated_html += "<div class='filler day "+(fill_day == 0 ? "new_line" : "")+"'>&nbsp;</div>";
        break_counter++;
    }
    
    for(let weekday = firstDay.getDay(); weekday <= 7; weekday++) {
        current_day.setDate(current_day.getDate() + 1);
        let this_date = current_day.toISOString().split('T')[0];
        generated_html += "<div class='normal-day day" + (break_counter % 7 == 0 ? " new_line" : "") + "' id='cal_" + current_day.toISOString().split('T')[0] + "' onclick=''>" + ++day_counter + "</div>";

        break_counter++;
    }
    
    /*
    Den där onclick gör så att alla dagar öppnar diven. 
    Längre ned gör du att det bara är dagar med sessions som ska vara klickbara
    Ta bort onclick härifrån?
    */
    for(let i = day_counter+1; i <= lastDay.getDate();i++) {
        current_day.setDate(current_day.getDate() + 1);
        let this_date = current_day.toISOString().split('T')[0];
        generated_html += "<div class='normal-day day " + (break_counter % 7 == 0 ? " new_line" : "") + "' id='cal_" + this_date + "' onclick=''>" + i + "</div>";
        
        break_counter++;
    }
    if(break_counter % 7 != 0) {
        for(let fill_day = break_counter % 7; fill_day < 7; fill_day++) {
            generated_html += "<div class='filler day'></div>";
        }
    }
    
    document.getElementById(target_div_name).innerHTML = generated_html;
    get_month_workout_sessions(date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2));
    setup_calender_listeners(target_div_name, date);
}

function generate_cal_month_header(show_date) {
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const week_day_letter = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var header_html = "<div id='prev_month_arrow'  class='cal_header arrow'><<</div>";
    header_html += "<div id='month_header month' class='cal_header month'>" + month_names[show_date.getMonth()] + " " + show_date.getFullYear() + "</div>";
    header_html += "<div id='next_month_arrow' class='cal_header arrow'>>></div>";
    for(let i = 0;i < 7;i++) { header_html +=  "<div class='" + (i == 0 ? "new_line ": "" )+ "day-header day'>" + week_day_letter[i] + "</div>"; }

    return header_html;
}

function closeSessionPlanner(workout_id){
    var form = document.getElementById('sessionForm'+workout_id);
    form.parentNode.removeChild(form);
    var workout_ul = document.getElementById('workout_ul');
    workout_ul.style.display = "block";
}

function show_workout(session_id) {
    
    $(document).ready(function () {
    
        $.ajax('/calendar/session/'+session_id,   // request url
			{            
				success: function (data, status, xhr) {    // success callback function
                    
                    //Creates the list of session for the given day
                    document.getElementById('sessions_page_title').innerHTML = "Sessions for " + data[0].workout_session_date.substr(0,10);
                    var button = document.createElement('button');
                    button.setAttribute('id', `session_button${session_id}`);
                    button.setAttribute('class', 'session_button');
                    button.appendChild(document.createTextNode(`${data[0].workout_name}`));
                    var li = document.createElement('li');
                    if(data[0].workout_session_completed === 1){
                        button.setAttribute('style', 'background-color:green');
                    }
                    document.getElementById('session_button_list').append(li);
                    document.getElementById('workout_session_popup').style.display = "block";
                    document.getElementById('calender-box').style.display = "none";
                    li.appendChild(button);

                    //Binds the function which hides the list of sessions to the close button, changes the view to show the calender.
                    $("#todays_sessions_div_close_btn").on("click", closeSessionPage);

                    /*
                    Checks if a session is completed or not. 
                    It then binds the button to one of 2 event handles depending if its completed or not
                    The first one creates the session_note form
                    The other one creates the edit session_note form
                    */
                    if(data[0].workout_session_completed !== 1){

                        var SessionFeedbackHandler = function(event){
                            openSessionFeedbackForm(data[0].workout_session_id, data[0].workout_name, data[0].workout_session_date.substr(0,10));
                        }
                        button.addEventListener('click', SessionFeedbackHandler, true);

                    } else{
                        var SessionEditHandler = function(event){
                            openSessionFeedbackEditForm(data[0].workout_session_id, data[0].workout_name, data[0].workout_session_date.substr(0,10));
                        }
                        button.addEventListener('click', SessionEditHandler, true)
                    }
				},
                error: function() {
                    alert('Something went wrong when you tried to open the list of sessions');
                }
			});
   });
}

/*
This function peforms a get request to get the latest session_note for the specific session
It then creates a simple input form where the user can update the session_note. 
An update means that a new session_note is created and the parent_id is set to the previous one.
TODO: 
The user can send in a empty field even if the field is required
I guess that the value of "" is still a value and does not count as empty?
*/
function openSessionFeedbackEditForm(session_id, workout_name, session_date){
    //GET request which returns the latest session note for the session.
    $(document).ready(function () {
        $.ajax({
            url: '/calender/session/edit/'+session_id,
            type: "GET",
            dataType: 'json',
            success: function (data, status){
                    //Creates the form. This shares much code with the original form where the user completes the session. 
                    //If we have time, refactor most of this code into a function.
                    var container = document.getElementsByClassName('sub_content')[0]; //This line will cause problems if we ever move the div containing the calender, give it an id instead
                    var form = document.createElement('FORM');
                    form.setAttribute('id', "workout_session_popup_form"+session_id)
                    container.appendChild(form);
                    document.getElementById('sessions_page_title').innerHTML = "Workout " + workout_name + " "  + session_date;
                    document.getElementById('session_button_list').style.display = 'none';

                    var input = document.createElement('textarea');
                    input.setAttribute('name', 'note_text');
                    input.setAttribute('id', 'note_edit_text'+session_id);
                    input.setAttribute('required', '');
                    input.setAttribute('rows', '10');
                    input.setAttribute('cols', '50');
                    input.innerHTML = data[0].text;

                    var inputLabel = document.createElement('LABEL');
                    inputLabel.setAttribute('for', 'note_text' + session_id);
                    inputLabel.innerHTML = "Edit the workout session note";

                    var linebreak = document.createElement("br");
                    var closeButton = document.createElement('button')
                    closeButton.setAttribute('id', 'todays_sessions_form__close_btn' +session_id);
                    closeButton.setAttribute('type', 'button');
                    var submitButton = document.createElement('button');
                    submitButton.setAttribute('id', 'todays_sessions_form__submit_btn'+session_id);
                    submitButton.setAttribute('type', 'button');
                    var secret = document.createElement('INPUT');
                    secret.setAttribute('type', 'hidden');
                    secret.setAttribute('name', 'session_id');
                    secret.value = session_id;
                    form.appendChild(secret);
                    form.appendChild(inputLabel);
                    form.appendChild(document.createElement('br'));
                    form.appendChild(input);
                    form.appendChild(linebreak);
                    form.appendChild(submitButton)
                    form.appendChild(closeButton);
                    document.getElementById('todays_sessions_div_close_btn').style.visibility = 'hidden';
                    closeButton.appendChild(document.createTextNode('Close form'));
                    submitButton.appendChild(document.createTextNode('Submit edited note'));
                    closeButton.addEventListener("click", closeSessionForm.bind(null, session_id,session_date));

                    var new_button = submitButton.cloneNode(true);
                    submitButton.parentNode.replaceChild(new_button, submitButton);
                    
                //Sends a post request which creates a new edited session_note when the submit button is pressed.
                $('#workout_session_popup_form'+session_id).on('click', '#todays_sessions_form__submit_btn'+session_id, function(e)
                {
                    e.stopImmediatePropagation(); //This stops the page from performing other requests which can interfere with the ajax call.
                    var note_text = document.getElementById('note_edit_text'+session_id).value
                    if(note_text === ""){
                        alert('You cannot leave the note empty')
                        return;
                    } 

                    if(note_text.length > 255){
                        alert('Session notes cannot be longer than 255 characters')
                        return;
                    }
                        $.ajax({
                            url: '/calender/session/edit/'+session_id,
                            type: "post",
                            data: {
                                session_id: session_id,
                                text: note_text
                            },
                            success: function(data){
                                alert('Note has been edited')

                            }
                        })
                })
            },
            error: function(){
                alert('Something went wrong when you tried to open the session_note edit form');
            }
    });
});
}

//This creates the form where the user can write a session_note.
function openSessionFeedbackForm(session_id, workout_name, session_date){
    /*
    TODO:
    The form is 90% identical to the edits_session_note form. If we have time, refactor most of this code into a function.
    */ 
    var container = document.getElementsByClassName('sub_content')[0];
    var form = document.createElement('FORM');
    form.setAttribute('id', "workout_session_popup_form"+session_id)
    container.appendChild(form);
    document.getElementById('sessions_page_title').innerHTML = "Workout " + workout_name + " "  + session_date;
    document.getElementById('session_button_list').style.display = 'none';

    var input = document.createElement('textarea');
    input.setAttribute('name', 'note_text');
    input.setAttribute('id', 'note_text' + session_id);
    input.setAttribute('required', '');
    input.setAttribute('rows', '10');
    input.setAttribute('cols', '50');

    var inputLabel = document.createElement('LABEL');
    inputLabel.setAttribute('for', 'note_text' + session_id);
    inputLabel.innerHTML = "Write a short summary of the workout session";

    var linebreak = document.createElement("br");
    var closeButton = document.createElement('button')
    closeButton.setAttribute('id', 'todays_sessions_form__close_btn'+session_id);
    closeButton.setAttribute('type', 'button');
    var submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'todays_sessions_form__submit_btn'+session_id);
    submitButton.setAttribute('type', 'button');
    var secret = document.createElement('INPUT');
    secret.setAttribute('type', 'hidden');
    secret.setAttribute('name', 'session_id');
    secret.value = session_id;
    form.appendChild(secret);
    form.appendChild(inputLabel);
    form.appendChild(document.createElement('br'));
    form.appendChild(input);
    form.appendChild(linebreak);
    form.appendChild(submitButton)
    form.appendChild(closeButton);
    document.getElementById('todays_sessions_div_close_btn').style.visibility = 'hidden';
    closeButton.appendChild(document.createTextNode('Close form'));
    submitButton.appendChild(document.createTextNode('Complete session'));
    closeButton.addEventListener("click", closeSessionForm.bind(null, session_id,session_date));

    //Perfoms a post request which creates a session note in the database, it also sets the session as completed.
    $('#workout_session_popup_form'+session_id).on('click', '#todays_sessions_form__submit_btn'+session_id, function(e){
        //e.stopImmediatePropagation(); //This stops the page from performing other requests which can interfere with the ajax call.
        var note_text = document.getElementById('note_text'+session_id).value
        if(note_text === ""){
            alert('You need to write a note to complete the session')
            return;
        } 

        console.log(typeof note_text)

        if(note_text.length > 255){
            alert('Session notes cannot be longer than 255 characters')
            return;
        }

        $.ajax({
            url:'/calendar/session/'+session_id,
            type: 'post',
            data: {
                session_id: session_id,
                text: note_text
            },
            success: function(data){
                /*
                Closes the form and colors the button green to indicate that the note has been written
                Did it this to avoid having to reload the page to change the color of the button.
                */
                closeSessionForm(session_id, session_date)
                var button = document.getElementById('session_button'+session_id);
                button.setAttribute('style', 'background-color:green');
                /*
                This is just 100% javascript weirdness. 
                When loading the page, a eventlistener is placed on each button which opens a session
                For some reason, this cannot be removed. So i clone a new button from the old, and this removes the listener
                Then i replace the old button with the new and give it a new eventlistener. 
                Im just as confused as you are.
                */
                var new_button = button.cloneNode(true);
                button.parentNode.replaceChild(new_button, button);
                var SessionEditHandler = function(event){
                    openSessionFeedbackEditForm(session_id, workout_name, session_date);
                }
                new_button.addEventListener('click', SessionEditHandler, true)
            },
            error:function(){
                alert('Something went wrong when you tried to open the session feedback form');
            }
        })
    });
}

//This function deletes the form where input notes are written.
//It then makes the lists of sessions for the specific day visible again.
function closeSessionForm(session_id, session_date){
    var form = document.getElementById('workout_session_popup_form'+session_id);
    form.parentNode.removeChild(form);
    document.getElementById('session_button_list').style.display = 'block';
    document.getElementById('todays_sessions_div_close_btn').style.visibility = 'visible';
    //document.getElementById('sessions_page_title').innerHTML = 'Todays sessions'
    document.getElementById('sessions_page_title').innerHTML = 'Sessions for ' + session_date;
}

//This is the inverse of the above closeSessionForm function
//This deletes the list of sessions and makes the session_note form visible.
function closeSessionPage(){
        var ul = document.getElementById('session_button_list');
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
        document.getElementById('workout_session_popup').style.display = "none"
        document.getElementById('calender-box').style.display = "block"
}

//Gunnar function
function setup_calender_listeners(target_div_name, current_date) {
    document.getElementById("prev_month_arrow").addEventListener("click", () => {
        render_calender(target_div_name, new Date(current_date.setMonth(current_date.getMonth()-1)));
    });
    document.getElementById("next_month_arrow").addEventListener("click", () => {
        render_calender(target_div_name, new Date(current_date.setMonth(current_date.getMonth()+1)));
    });
}

//Gunnar function
function get_month_workout_sessions(year_month) {
     $(document).ready(function () {
        $.ajax('/calendar/'+year_month,   // request url
			{            
				success: function (data, status, xhr) {    // success callback function
                    data.forEach(current_row => {
                        var current_date = JSON.parse(JSON.stringify(current_row)).session_date;
                        var current_date_obj = document.getElementById("cal_"+ current_date);
                        if(current_date_obj) {
                            current_date_obj.className = "session-day day";
                            var current_workout_id = JSON.stringify(current_row.id);
                            current_date_obj.addEventListener("click", () => {
                                show_workout(current_workout_id);
                            });
                        }
                    });
				},
                error: function() {
                    alert('fel');
                }
			});
   });
}

function update_calendar(data) {
    
}
