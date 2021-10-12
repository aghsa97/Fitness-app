/*Insert statements*/

TRUNCATE `workout_db`.`user_friends`;
DELETE FROM `workout_db`.`user_info` WHERE id < 100;
DELETE FROM `workout_db`.`workout_exercise` WHERE id < 100;
TRUNCATE `workout_db`.`session_note`;
DELETE FROM `workout_db`.`workout_session` WHERE id < 100;
DELETE FROM `workout_db`.`workout` WHERE id < 100;
DELETE FROM `workout_db`.`user` WHERE id < 100;
DELETE FROM `workout_db`.`exercise` WHERE id < 100;

ALTER TABLE `workout_db`.`exercise` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`user` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`user_friends` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`user_info` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`workout` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`workout_exercise` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`workout_session` AUTO_INCREMENT = 1;
ALTER TABLE `workout_db`.`session_note` AUTO_INCREMENT = 1;

INSERT INTO exercise (name, description) values ("Pushup", "Do it");
INSERT INTO exercise (name, description) values ("Pullup", "Do it");
INSERT INTO exercise (name, description) values ("Air Squat", "Do it");
INSERT INTO exercise (name, description) values ("Lounges", "Do it");
INSERT INTO exercise (name, description) values ("Wallclimb", "Do it");
INSERT INTO exercise (name, description) values ("Deadlift", "Do it");
INSERT INTO exercise (name, description) values ("Hang Powerclean", "Do it");
INSERT INTO exercise (name, description) values ("Push Press", "Do it");
INSERT INTO exercise (name, description) values ("Rounds", "");

INSERT INTO user (email, hash) values ("pt_putte@mail.com", "1234");
INSERT INTO user (email, hash) values ("august@mail.com", "1234");
INSERT INTO user (email, hash) values ("berit@mail.com", "1234");
INSERT INTO user (email, hash) values ("calle@mail.com","1234");
INSERT INTO user (email, hash) values ("david@mail.com","1234");
INSERT INTO user (email, hash) values ("erik@mail.com","1234");

INSERT INTO `workout_db`.`user_friends` (r_friend_id, a_friend_id, accepted) VALUES (1, 3, TRUE);
INSERT INTO `workout_db`.`user_friends` (r_friend_id, a_friend_id, accepted) VALUES (1, 4, TRUE);
INSERT INTO `workout_db`.`user_friends` (r_friend_id, a_friend_id, accepted) VALUES (2, 3, FALSE);
INSERT INTO `workout_db`.`user_friends` (r_friend_id, a_friend_id, accepted) VALUES (3, 5, TRUE);

INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (1, "`Patrik", "Pettersson", 87, 185, "male", 'trainer');
INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (2, "August", "Allard", 90, 185, "male", 'client');
INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (3, "Berit", "Ballard", 56, 158, "female", 'client');
INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (4, "Calle", "Callard", 98, 175, "male", 'client');
INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (5, "David", "Dallard", 78, 190, "male", 'client');
INSERT INTO `workout_db`.`user_info` (`user_id`, `firstname`, `lastname`, `weight`, `height`, `gender`, `role`) VALUES (6, "Erik", "Eriksson", 68, 175, "male", 'client');

INSERT INTO `workout_db`.`workout` (`name`, `creator_id`, `user_id`, `level`) VALUES ("Test Workout 1", 1, 1, 1);
INSERT INTO `workout_db`.`workout` (`name`, `creator_id`, `user_id`, `level`) VALUES ("Test Workout 2", 1, 2, 1);
INSERT INTO `workout_db`.`workout` (`name`, `creator_id`, `user_id`, `level`) VALUES ("DT", 1, 3, 10);

INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 3, 0, 20, 1);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 1, 0, 20, 2);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 3, 0, 15, 3);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 1, 0, 15, 4);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 3, 0, 10, 1);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 1, 0, 10, 2);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 3, 0, 5, 3);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (1, 1, 0, 5, 4);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (2, 4, 16, 200, 1);

INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (3, 9, 0, 5, 1);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (3, 6, 70, 12, 2);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (3, 7, 70, 9, 3);
INSERT INTO `workout_db`.`workout_exercise` (`workout_id`, `exercise_id`, `e_load`, `e_reps`, `e_order`) VALUES (3, 8, 70, 6, 4);

INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-09-30 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-02 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-05 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-07 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-09 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-12 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-14 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-16 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-19 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-21 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-23 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-26 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-28 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-10-30 08:00:00' , 0);
INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-11-01 08:00:00' , 0);

INSERT INTO `workout_db`.`session_note` (`session_id`, `user_id`, `parent_id`, `text`) VALUES (1, 2, NULL, "Very jobbigt. I'm trött in my ländrygg!");
INSERT INTO `workout_db`.`session_note` (`session_id`, `user_id`, `parent_id`, `text`) VALUES (1, 1, 1, "You are very klen. You pay double price!");