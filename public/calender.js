function render_calender(target_div_name, set_date) {
    var date;
    if(set_date == 0) {
        date = new Date();
       
    } else {
        date = set_date;
        
    }
    let session_dict = {"2021-10-02" : 2,"2021-09-05" : 3,"2021-09-07" : 4,"2021-09-09" : 5,"2021-09-12" : 6,"2021-09-14" : 7,"2021-09-16" : 8,"2021-09-19" : 9,"2021-09-21" : 10,"2021-09-23" : 11,"2021-09-26" : 12,"2021-09-28" : 13 }
    
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var current_day = new Date(date.getFullYear(), date.getMonth(), 1);

    var generated_html = generate_cal_month_header(date);
    var day_counter = 0;
    var debug = new Array();
    console.log(firstDay);

    var break_counter = 0;
    
    for(let fill_day = 0; fill_day < firstDay.getDay()-1; fill_day++) {
        generated_html += "<div class='filler day "+(fill_day == 0 ? "new_line" : "")+"'>&nbsp;</div>";
        debug.push(fill_day);
        break_counter++;
    }

    console.log(debug);
    debug.length = 0;
    
    for(let weekday = firstDay.getDay(); weekday <= 7; weekday++) {
        current_day.setDate(current_day.getDate() + 1);
        let this_date = current_day.toISOString().split('T')[0];
        generated_html += "<div class='" + (session_dict[this_date]  !== undefined ? "session-day" : "normal-day") + " day" + (break_counter % 7 == 0 ? " new_line" : "") + "' id='cal_" + current_day.toISOString().split('T')[0] + "' onclick='show_workout(this.id)'>" + ++day_counter + "</div>";

        break_counter++;
    }
    
    
    for(let i = day_counter+1; i <= lastDay.getDate();i++) {
        current_day.setDate(current_day.getDate() + 1);
        let this_date = current_day.toISOString().split('T')[0];
        generated_html += "<div class='" + (session_dict[this_date]  !== undefined ? "session-day" : "normal-day") + " day " + (break_counter % 7 == 0 ? " new_line" : "") + "' id='cal_" + this_date + "' onclick='show_workout(this.id)'>" + i + "</div>";
        
        break_counter++;
    }
    if(break_counter % 7 != 0) {
        for(let fill_day = break_counter % 7; fill_day < 7; fill_day++) {
            generated_html += "<div class='filler day'>"+break_counter+"</div>";
        }
    }
    
    document.getElementById(target_div_name).innerHTML = generated_html;
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

function show_workout(workout_date) {
    sess_dict = [];
    date_string = workout_date.replace("cal_", "");
        document.getElementById('workout-box').style.display = "block";
        document.getElementById('workout-box').innerHTML = date_string + " --- " +sess_dict[date_string];
}

function setup_calender_listeners(target_div_name, current_date) {
    document.getElementById("prev_month_arrow").addEventListener("click", () => {
        render_calender(target_div_name, new Date(current_date.setMonth(current_date.getMonth()-1)));
    });
    document.getElementById("next_month_arrow").addEventListener("click", () => {
        render_calender(target_div_name, new Date(current_date.setMonth(current_date.getMonth()+1)));
    });
}