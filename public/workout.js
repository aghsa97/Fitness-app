function show_single_day_workout(workout_date, target_id) {
    
    $(document).ready(function () {
    
        $.ajax('/workout/'+workout_date,   // request url
			{            
				success: function (data, status, xhr) {    // success callback function
                    
                    //alert(JSON.stringify(data));
                    exercise_rows = data[0];
                    var target =  document.getElementById(target_id);
                    var html_string = "<table style='border:1px dotted white;width:100%'>";
                    var num_workouts = 0;
                    var current_workout_name = "";
                    var current_session_time = "";
                    for(var exercise_no = 0;exercise_no < exercise_rows.length; exercise_no++) {
                        if(current_workout_name != exercise_rows[exercise_no].workout_name || current_session_time != exercise_rows[exercise_no].session_time) {
                            if(num_workouts > 0) {
                                html_string += "<tr><td colspan='3'>&nbsp;</td></tr>";
                            }
                            current_workout_name = exercise_rows[exercise_no].workout_name;
                            current_session_time = exercise_rows[exercise_no].session_time;
                            num_workouts++
                            html_string += "<tr><td>" + current_workout_name + "</td><td colspan ='2'>[@" + current_session_time.slice(11, 16) + "]</td></tr>";
                        }
                        html_string += "<tr>";
                        html_string += "<td>"+exercise_rows[exercise_no].exercise_name+"</td>";
                        html_string += "<td>"+(exercise_rows[exercise_no].exercise_load > 0 ? exercise_rows[exercise_no].exercise_load : "" )+"</td>";
                        html_string += "<td>"+(exercise_rows[exercise_no].exercise_reps > 0 ? exercise_rows[exercise_no].exercise_reps : "" )+"</td>";
                        html_string += "</tr>";
                    }
                    html_string += "</table>";

                    target.innerHTML = html_string;
                }
			});
   });
}