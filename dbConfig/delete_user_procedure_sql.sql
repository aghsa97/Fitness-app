DROP PROCEDURE IF EXISTS delete_user_by_id;

DELIMITER $$
CREATE PROCEDURE delete_user_by_id(IN delete_user_id INT)
BEGIN
		SET foreign_key_checks = 0; 
		DELETE FROM user_friends WHERE r_friend_id = delete_user_id OR a_friend_id = delete_user_id;
	
    	DELETE FROM workout_session WHERE workout_id IN (SELECT id FROM workout WHERE user_id = delete_user_id);
        
        DELETE FROM workout WHERE user_id = delete_user_id;
        
        DELETE FROM user_info WHERE user_id = delete_user_id;

        DELETE FROM user WHERE id = delete_user_id;
        SET foreign_key_checks = 1; 
END $$
DELIMITER ;


        
        
        