DROP PROCEDURE IF EXISTS copy_workout_to_user;

DELIMITER $$
CREATE PROCEDURE copy_workout_to_user(IN original_workout_id INT, IN to_user_id INT)
BEGIN
		INSERT INTO workout (name, creator_id, user_id, level) SELECT name, to_user_id, to_user_id, level FROM workout WHERE id = original_workout_id;
        
        SET @new_workout_id = LAST_INSERT_ID();
	
        INSERT INTO workout_exercise (workout_id, exercise_id, e_load, e_reps, e_order) SELECT @new_workout_id, exercise_id, e_load, e_reps, e_order FROM workout_exercise WHERE workout_id = original_workout_id;
        
END $$
DELIMITER ;