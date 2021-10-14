DROP PROCEDURE IF EXISTS get_todays_user_workout;
DELIMITER $$
CREATE PROCEDURE get_todays_user_workout(IN workout_user_id int)
BEGIN
SELECT 
	wo_se.id AS workout_id, 
    wo.name AS workout_name, 
    e.name AS exercise_name,
    we.e_load AS exercise_load,
    we.e_reps AS exercise_reps
FROM 
	workout_session AS wo_se,  
    workout AS wo,
    workout_exercise AS we,
    exercise AS e
WHERE  
	CAST(wo_se.session_time AS DATE) >= CAST(NOW() AS DATE) 
    AND CAST(wo_se.session_time AS DATE) < cast((NOW() + interval 1 day) AS DATE) 
    AND wo_se.workout_id = wo.id 
    AND we.workout_id = wo.id
    AND we.exercise_id = e.id
    AND wo.user_id = workout_user_id
ORDER BY
	we.e_order ASC;
END $$
DELIMITER ;