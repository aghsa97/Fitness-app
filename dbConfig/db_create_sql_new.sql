CREATE TABLE `exercise` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `target_muscle` varchar(45) DEFAULT NULL,
  `level` INT DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `user` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(128) DEFAULT NULL UNIQUE,
  `hash` varchar(128) DEFAULT NULL,
  `salt` varchar(64) DEFAULT NULL,
  `verified` tinyint DEFAULT 0,
  PRIMARY KEY (`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `user_friends` (
  `r_friend_id` INT unsigned NOT null, 
  `a_friend_id` INT unsigned NOT null,
  `accepted` TINYINT DEFAULT FALSE,
  CONSTRAINT `friendship` PRIMARY KEY (`r_friend_id`, `a_friend_id`),
  CONSTRAINT `user_friends_r_friend_id` FOREIGN KEY (`r_friend_id`) REFERENCES user(`id`),
  CONSTRAINT `user_friends_a_friend_id` FOREIGN KEY (`a_friend_id`) REFERENCES user(`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `user_info` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `user_id` INT unsigned DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `height` INT DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `role` enum('trainer','client') DEFAULT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `user_info_user_id` FOREIGN KEY (`user_id`) REFERENCES user(`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `workout` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `creator_id` INT unsigned NOT NULL,
  `user_id` INT unsigned DEFAULT NULL,
  `level` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `workout_user_id` FOREIGN KEY (`user_id`) REFERENCES user(`id`),
  CONSTRAINT `workout_creator_id` FOREIGN KEY (`creator_id`) REFERENCES user(`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `workout_exercise` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `workout_id` INT unsigned NOT NULL,
  `exercise_id` INT unsigned NOT NULL,
  `load` varchar(45) DEFAULT NULL,
  `reps` INT DEFAULT NULL,
  `order` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `workout_exercise_workout_id` FOREIGN KEY (`workout_id`) REFERENCES workout(`id`),
  CONSTRAINT `workout_exercise_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES exercise(`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `workout_session` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `workout_id` INT unsigned DEFAULT NULL,
  `when` datetime NOT NULL,
  `completed` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `workout_session_workout_idx` (`workout_id`),
  CONSTRAINT `workout_session_workout` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) engine=InnoDB default charset=latin1;

CREATE TABLE `session_note` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `session_id` INT unsigned NOT NULL,
  `user_id` INT unsigned NOT NULL,
  `parent_id` INT unsigned DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `session_note_session_id` FOREIGN KEY (`session_id`) REFERENCES workout_session(`id`),
  CONSTRAINT `session_note_user_id` FOREIGN KEY (`user_id`) REFERENCES user(`id`),
  CONSTRAINT `session_note_parent_id` FOREIGN KEY (`parent_id`) REFERENCES session_note(`id`)
) engine=InnoDB default charset=latin1;