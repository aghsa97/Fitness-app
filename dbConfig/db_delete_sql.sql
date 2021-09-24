ALTER TABLE `user_friends` DROP FOREIGN KEY `user_friends_r_friend_id`;
ALTER TABLE `user_friends` DROP FOREIGN KEY `user_friends_a_friend_id`;
ALTER TABLE `user_info` DROP FOREIGN KEY `user_info_user_id`;
ALTER TABLE `workout` DROP FOREIGN KEY `workout_user_id`;
ALTER TABLE `workout` DROP FOREIGN KEY `workout_creator_id`;
ALTER TABLE `workout_exercise` DROP FOREIGN KEY `workout_exercise_workout_id`;
ALTER TABLE `workout_exercise` DROP FOREIGN KEY `workout_exercise_exercise_id`;
ALTER TABLE `session_note` DROP FOREIGN KEY `session_note_session_id`;
ALTER TABLE `session_note` DROP FOREIGN KEY `session_note_user_id`;
ALTER TABLE `session_note` DROP FOREIGN KEY `session_note_parent_id`;
ALTER TABLE `workout_session` DROP FOREIGN KEY `workout_session_workout`;

DROP TABLE IF EXISTS `workout_session`;
DROP TABLE IF EXISTS `exercise`;
DROP TABLE IF EXISTS `user_friends`;
DROP TABLE IF EXISTS `user_info`;
DROP TABLE IF EXISTS `workout`;
DROP TABLE IF EXISTS `workout_exercise`;
DROP TABLE IF EXISTS `session_note`;
DROP TABLE IF EXISTS `user`;

DROP DATABASE IF EXISTS `workout_db`;

CREATE DATABASE `workout_db`;

USE `workout_db`;