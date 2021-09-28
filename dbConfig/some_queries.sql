#Hämta alla datum 
SELECT DATE_FORMAT(ws.session_time, '%Y-%m-%d') AS session_date, ws.id FROM workout_session AS ws, workout AS w WHERE (ws.session_time BETWEEN DATE_FORMAT(NOW() ,'%Y-%m-01') AND LAST_DAY( NOW())) AND w.id = ws.workout_id AND w.user_id = 2;

SELECT * FROM workout_session;

SELECT * FROM user;