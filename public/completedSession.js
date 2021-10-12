const { json } = require("express")
const session = require("express-session")

//Gets the latest note of the completed session
function getCompletedSessionNote(session_id){

    $(document).ready(function(){

        $.ajax({
            url: "/completedsessionlatestnote/"+session_id,
            type: "GET",
            dataType: "json",
            success: function(data, status){
                var session_note_data = data;
                JSON.stringify(session_note_data)
                getSessionWorkout(session_id, session_note_data)
                
            }, 
            error: function(){
                alert('Could not get the the latest session note')
            }
        })
    })
}

//Gets info about the workout that the specific session is based on
function getSessionWorkout(session_id, session_note_data){

    $(document).ready(function(){
 
        $.ajax({
            url: "/completedsessionworkout/"+session_id,
            type: "GET",
            dataType: "json",
            success: function(data, status){
                var workout_session_data = data;
                JSON.stringify(workout_session_data)
                getSessionWorkoutExercise(session_id, session_note_data, workout_session_data)

            }, 
            error: function(){
                alert('Could not get the workout info for the session')
            }
        })
    })
}

//Gets all workout_exercises that are connected to the workout that the session is based on. 
function getSessionWorkoutExercise(session_id, session_note_data, workout_session_data){

    $(document).ready(function(){

        $.ajax({
            
            url: "/completedsessionworkoutexercise/"+workout_session_data[0].w_id,
            type: "GET",
            dataType: "json",
            success: function(data, status){
                var workout_exercise_data = data;
                JSON.stringify(workout_exercise_data)
                createCompletedSessionsInfoPage(session_id, session_note_data, workout_session_data, workout_exercise_data)

            }, 
            error: function(){
                alert('Could not get the workout exercises for the session')
            }
        })
    })
}

//Creates the infomation div which whows all the info about the completed session. 
function createCompletedSessionsInfoPage(session_id, session_note_data, workout_session_data, workout_exercise_data){

    document.getElementById('right').style.display = "none";

    var infoDiv = document.getElementById('workout_session_popup');
    infoDiv.style.display = "block"
    var container = document.getElementById('sub_content_completed_sessions');

    var info_list = document.createElement('DIV');
    info_list.setAttribute('class', 'info-list');
    container.appendChild(info_list);

    var list_header = document.createElement('DIV');
    list_header.setAttribute('class', 'list-header');
    info_list.appendChild(list_header);

    var title = document.createElement('P');

    var strong = document.createElement('Strong');
    strong.innerHTML = workout_session_data[0].w_name + " " + workout_session_data[0].session_time.substr(0,10);
    container.appendChild(document.createElement('br'))
   
    list_header.appendChild(title);
    title.appendChild(strong);

    var session_note_text = session_note_data[0].text;

    var session_note_div = document.createElement('div');

    session_note_div.setAttribute('id', "sessionInfo"+session_id);
    session_note_div.setAttribute('class', "text-box");

    var sessionFeedbackLabel = document.createElement('LABEL');
    sessionFeedbackLabel.setAttribute('for', "sessionInfo"+session_id);
    sessionFeedbackLabel.appendChild(document.createTextNode("Session feedback"));

    container.appendChild(sessionFeedbackLabel);
    container.appendChild(session_note_div);
    session_note_div.innerHTML = session_note_text;

    if (workout_exercise_data.length > 0) {

        var ul = document.createElement('UL');
        ul.setAttribute("class", 'trainer_homepage_list');
        ul.setAttribute("id", 'trainer_homepage_list'+session_id);

        var sessionExerciseLabel = document.createElement('LABEL');
        sessionExerciseLabel.setAttribute('for', "trainer_homepage_list"+session_id);
        container.appendChild(document.createElement('br'))
        sessionExerciseLabel.appendChild(document.createTextNode("Session exercises"));
        
        container.appendChild(sessionExerciseLabel);

        container.appendChild(document.createElement('br'))

        var input = document.createElement('input');
        input.setAttribute('class', 'normal');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'filter_input'+session_id);
        input.setAttribute('placeholder', "Filter results");

        input.setAttribute('onkeyup', `filter_exercise_list(${session_id})`)

        container.appendChild(input);
        container.appendChild(ul);

        var i = 1;

        workout_exercise_data.forEach(exercise => {

            var li = document.createElement('li')
            li.setAttribute('id', 'exercise'+i);
            li.setAttribute('class', 'list_item');
        
            exerciseContainer = document.createElement('div')
            exerciseContainer.setAttribute('class', 'exercise_entry');

            enameDiv = document.createElement('div');
            enameDiv.setAttribute('class', 'text-box');

            eLoadDiv = document.createElement('div');
            eLoadDiv.setAttribute('class', 'text-box');

            eRepsDiv = document.createElement('div');
            eRepsDiv.setAttribute('class', 'text-box');

    
            if(exercise.target_muscle === "Stretch" || exercise.target_muscle === "Cardio"){
                var a = document.createElement('a');
                a.innerHTML = exercise.ename;
                enameDiv.appendChild(a);
                eRepsDiv.appendChild(document.createTextNode("Exercise time: " + exercise.ereps))
                li.appendChild(exerciseContainer);
                exerciseContainer.appendChild(enameDiv);
                exerciseContainer.appendChild(eRepsDiv);
                ul.appendChild(li)
                i++;  

            } else{
                var a = document.createElement('a');
                a.innerHTML = exercise.ename;
                enameDiv.appendChild(a);
                eLoadDiv.appendChild(document.createTextNode("Exercise Load: " + exercise.eload))
                eRepsDiv.appendChild(document.createTextNode("Exercise Reps: " + exercise.ereps))
                li.appendChild(exerciseContainer);
                exerciseContainer.appendChild(enameDiv);
                exerciseContainer.appendChild(eLoadDiv);
                exerciseContainer.appendChild(eRepsDiv);
                ul.appendChild(li)
                i++;  
            }
        })
        i = 1;  
    }
    closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'completedSessionsPageCloseButton');
    closeButton.appendChild(document.createTextNode('Close'));
    container.appendChild(closeButton);
    $("#completedSessionsPageCloseButton").on("click", closeCompletedSessionsInfoPage);
}

function closeCompletedSessionsInfoPage(){

    var workout_session_sub_content = document.getElementById("sub_content_completed_sessions");
    while (workout_session_sub_content.firstChild) {
        workout_session_sub_content.removeChild(workout_session_sub_content.lastChild);
    }

    document.getElementById('right').style.display = "block";
    document.getElementById('workout_session_popup').style.display = "none";
}

function filter_exercise_list(session_id) {

    var filter_input = document.getElementById('filter_input'+session_id).value;
     var filter = filter_input.toUpperCase();
     var the_list = document.getElementById('trainer_homepage_list'+session_id);
     var list_items = the_list.getElementsByTagName('li');
     
     for (i = 0; i < list_items.length; i++) {
         a = list_items[i].getElementsByTagName("a")[0];
         txtValue = a.textContent || a.innerText;
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
             list_items[i].style.display = "";
         } else {
             list_items[i].style.display = "none";
         }
     }
 }

 function filter_session_list() {
    var filter_input = document.getElementById('filter_input').value;
     var filter = filter_input.toUpperCase();
     var the_list = document.getElementById('completed_session_ul_list');
     var list_items = the_list.getElementsByTagName('li');

     for (i = 0; i < list_items.length; i++) {
         date = list_items[i].getElementsByTagName("a")[0];
         sessionName = list_items[i].getElementsByTagName("a")[1];
         dateValue = date.textContent || date.innerText;
         sessionNameValue = sessionName.textContent || sessionName.innerText;
         if (dateValue.toUpperCase().indexOf(filter) > -1 || sessionNameValue.toUpperCase().indexOf(filter) > -1 ) {
             list_items[i].style.display = "";
         } else {
             list_items[i].style.display = "none";
         }
     }
 }