SELECT w.`id`, w.`name`, ws.id, ws.`when` FROM `workout` AS w, `workout_session` AS ws, `user` AS u WHERE u.id = 2 AND ws.when > NOW() AND ws.workout_id = w.id; 

/*SELECT ui.`firstname`, wn.`text`, wn.`parent_id` FROM user AS u, user_info AS ui, workout_note AS wn WHERE wn.workout_id = 1 AND ui.user_id = wn.user_id AND wn.`parent_id` IS NULL LIMIT 1;

SELECT * FROM workout_note WHERE parent_id IS NULL;*/