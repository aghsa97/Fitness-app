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

INSERT INTO exercise (name, target_muscle, level, description) values ('Lat pulldown', 'Back', 2, 'Pull a wheight/rope down from above your head down to your chest, gently raise the bar again and repeat.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Deadlift', 'Back', 4, 'Stand with your feet about shoulder-width apart. Pull a barbell up from the floor while keeping your back arched and knees bent.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Seated row', 'Back', 1, 'Sit with back tall, arms straight out and holding on to the handles. Using your back pull the tubing, bending at the elbows, keeping a 90 degree angle');
INSERT INTO exercise (name, target_muscle, level, description) values ('Upper back row', 'Back', 1, 'Sit with back tall, arms straight out and holding onto the handles, palms facing down. Keeping elbows up and using your back, bend the elbows back to a 90 degree angle.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Bent over fly', 'Back', 1, ': Bend at the hip, flat back, arms straight down. Using your mid back with arms slightly bent; raise your hands out to the side while keeping your back flat.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Pull up', 'Back', 1, 'Grab a horizontal bar above your head wider than shoulder-width apart. Lift yourself up until your chin is level with the bar. Gently lower yourself again and repeat.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Push up', 'Chest', 2, 'On your toes and hands placed a bit wider than shoulder width and in line with the chest, fingers facing forward');
INSERT INTO exercise (name, target_muscle, level, description) values ('Chest press', 'Chest', 1, 'Stand/sit with your back to a wall, tubing or weights in both hands, arms bent at a 90 degree angle, palms facing down. Using the chest muscle, press arms straight forward to in front of the chest');
INSERT INTO exercise (name, target_muscle, level, description) values ('Decline chest press', 'Chest', 2, 'Stand/sit with your back to the door, tubing or weights in both hands, arms bent at a 90 degree angle, palms facing down, and arms in line with the tubing. Using the chest muscle, press arms straight forward toward the ground, just below the chest.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Elevated push up', 'Chest', 3, 'With your feet on a chair, bench, books or box and hands placed a bit wider than shoulder width and in line with the chest, fingers facing forward. Bend the elbows to a 90 degree angle, lowering the chest toward the ground, keeping your back flat.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Bench press', 'Chest', 2, 'Lie down on a bench with a barbell. Grip the barbell slightly wider than shoulder-width. Bring the barbell down to your chest and lift it up again until your arms are straight while keeping your back arched.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Standing shoulder press', 'Shoulder', 2, 'Stand tall and grab a dumbbell in each hand. Start by holding the dumbbells shoulder high with your elbow in a 90-degree angle. Raise your arms above your head until they are straight and back down again to a 90-degree angle.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Lateral raise', 'Shoulder', 2, 'Stand with weights in both hands, arms at side with palms facing in. Using your shoulders, lift arms out to side up to shoulder height, keeping a slight bend in the elbow');
INSERT INTO exercise (name, target_muscle, level, description) values ('Seated front raise', 'Shoulder', 2, 'Sit tall with feet together, arms at the side, palms facing forward. Using the front of the shoulder, lift the arm forward, up in front of the body with a slight bend in the elbow');
INSERT INTO exercise (name, target_muscle, level, description) values ('External rotation', 'Shoulder', 2, 'With the working elbow at your side, arm at a 90 degree angle in front of the body holding the tubing handle. Using your shoulder and keeping the elbow at the side rotate the arm out to create a 90 degree angle to the outside.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Plank', 'Abs', 1, 'On your stomach, propped up on your elbows. Rise up on your toes and elbows so your body is off the ground and in a straight line.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Situp', 'Abs', 1, 'Lie on back, knees bent, feet flat on floor and hands on the front part of the legs. Keeping the hands in contact with the leg, use your abs to curl up as your hands slide up your legs to the knees');
INSERT INTO exercise (name, target_muscle, level, description) values ('Reach up pike', 'Abs', 2, 'Lie on your back with arms and legs straight up in the air. Using your abs, reach the legs and arms up to the ceiling');
INSERT INTO exercise (name, target_muscle, level, description) values ('Flutter kicks', 'Abs', 2, 'Lie on your back, hands at your side or under low back, one leg straight on the ground, one in the air');
INSERT INTO exercise (name, target_muscle, level, description) values ('Plank with leg lift', 'Abs', 2, 'On your elbows and toes, body straight, abs tight. Lift one leg straight up and hold for 3-5 seconds.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Bicep curl', 'Arms', 1, 'Stand with feet hip width apart, hand on handles at side, palms facing forward. Contract the bicep muscle, bending at the elbow, bringing the hand towards the shoulder');
INSERT INTO exercise (name, target_muscle, level, description) values ('Concentration curl', 'Arms', 1, 'Place elbow inside one knee/leg holding handle, palm facing up. Contract bicep bringing hand toward the shoulder as elbow stays in contact with the leg.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Tricep pushdown', 'Arms', 1, 'Stand with feet hip width apart, elbows at your side, palms facing down. Contracting the triceps, straighten the arm bringing your arms straight to your side.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Tricep extension', 'Arms', 1, 'With one hand holding the wheight behind your back. Using the triceps muscle, straighten the upper arm then lower back down to start position');
INSERT INTO exercise (name, target_muscle, level, description) values ('Leg curl', 'Legs', 1, 'Stand with feet together facing the door and a band wrapped around ankle or foot. Using the hamstring and keeping the knees together, lift the lower leg and foot toward your glutes.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Hamstring pull down', 'Legs', 1, 'Lie on your back, leg with the tubing in the air, the other is bent with the foot flat on the floor. Using your hamstrings and keeping the leg straight lower the leg to the floor.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Standing cross over', 'Legs', 1, 'Stand parallel to the door, band around ankle closest to the door. Using the inner thigh, cross the leg with the band in front of the body.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Inner thigh leg lift', 'Legs', 1, 'On your side, head propped up, bottom leg straight, top leg bent with foot on floor and next to knee.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Kickback', 'Legs', 1, 'On all fours with hands directly under your shoulders holding on to the ends of the band. The center of the band is wrapped around one of the feet. Using your Glutes push the leg back straight, making sure there is tension on the band.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Side leg lift', 'Legs', 1, 'Lying on your side, bottom leg straight top leg straight out in front of you. Using the top leg and hip, keeping the leg straight, lift straight up in front of you.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Squat', 'Legs', 2, 'Put a barbell behind your neck across the top of your back and grip the bar wider than shoulder-width. Squat down so the hips are level with your knees and rise again while keeping your back straight.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Lunge', 'Legs', 1, 'Stand in a split stance, toes facing forward. Bend both knees and lower to the ground, back heel will come off the floor');
INSERT INTO exercise (name, target_muscle, level, description) values ('Jog', 'Cardio', 1, 'Go for a longer run in your own tempo, either on a treadmill or outside.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Interval run', 'Cardio', 2, 'Run in a faster pace for a set time period, then slow down and catch your breath for the next time period. Repeat');
INSERT INTO exercise (name, target_muscle, level, description) values ('Cross shoulder stretch', 'Stretch', 1, 'Stand with one arm across the body at shoulder height, bending the other arm to a 90 degree angle, helping assist in the stretch, pulling it closer to the body');
INSERT INTO exercise (name, target_muscle, level, description) values ('Chest chair stretch', 'Stretch', 1, 'Stand with your back to a chair and reach behind. Placing both hands on the chair, open the chest as you reach your hands back.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Overhead tricep stretch', 'Stretch', 1, 'Stand tall with one arm bent behind the head, elbow pointing up. Try to drop the shoulder as the other hand assists in the stretch, pulling the elbow back.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Quad stretch', 'Stretch', 1, 'Optionally you can hold on to a chair for balance, stand on one leg as you hold the foot of the other bent leg behind you.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Butterfly', 'Stretch', 1, 'Sit tall with the legs bent with the bottoms of the feet together, close to the body. Gently let the knees drop open.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Hamstring stretch', 'Stretch', 1, 'Sit Tall with one leg straight. Place the band around the ball of the foot and gently pull towards you.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Glute stretch', 'Stretch', 1, 'Lie on your back with left ankle over the right knee. Hold both hands behind the right knee and draw both legs to the chest.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Seated hip stretch', 'Stretch', 1, 'Sit on the edge of the chair one ankle over opposite knee. Sitting tall, gently lean forward till you feel a stretch in the hip. ');
INSERT INTO exercise (name, target_muscle, level, description) values ('Seated wide leg stretch', 'Stretch', 1, 'Sit at the edge of the chair. From the hips, lean forward/out with your elbows inside your knees, gently pushing knees open.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Wall calf stretch', 'Stretch', 1, 'Stand about 2 feet from a flat, clear wall. Place the ball of one foot against the wall, supporting yourself with your hands on the wall. Gently lean forward until you feel a slight stretch');
INSERT INTO exercise (name, target_muscle, level, description) values ('Cobra stretch', 'Stretch', 1, 'Lie on your stomach and your hands out in front of you with your hands on the ground. Press the upper body up and look to the ceiling');
INSERT INTO exercise (name, target_muscle, level, description) values ('Overhead side stretch', 'Stretch', 1, 'Grasp a band/bar so it is taut between the hands at a 90 degree angle. Gently pull down on the arm out to the side as you pull up to the sky the other arm. Repeat sides');
INSERT INTO exercise (name, target_muscle, level, description) values ('Seated floor twist', 'Stretch', 1, 'Sit with your right hand behind you and the right leg bent with the foot on the outside of the straightened left leg. Brace the left elbow on the outside of the right knee, helping assist the body to twist. Then switch sides.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Inner thigh/groin stretch', 'Stretch', 1, 'Laying on your back, with one leg straight or bent, wrap the band around one foot. Move the leg out to the sidetil you feel a stretch. Gently pull on the band to assist a deeper stretch. ');
INSERT INTO exercise (name, target_muscle, level, description) values ('Wrist stretch', 'Stretch', 1, 'Sit or stand with your arms in front of you. Gently bend one wrist down while the opposite hand assists in a deeper stretch.');
INSERT INTO exercise (name, target_muscle, level, description) values ('Side head stretch', 'Stretch', 1, 'Stand with the head tilted, ear towards the shoulder. The other arm hangs down, fingers toward the ground for a greater stretch. Use the opposite hand to gently assist the stretch.');

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

INSERT INTO `workout_db`.`workout_session` (`workout_id`, `session_time`, `completed`) VALUES (3, '2021-09-31 08:00:00' , 0);
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