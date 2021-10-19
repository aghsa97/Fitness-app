const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/signUpController');
const trainerClientController = require('../controllers/trainerClientController');
const createWorkoutController = require('../controllers/createWorkoutController');
const createExerciseController = require('../controllers/createExerciseController');
const approveController = require('../controllers/approveController');
const calendarController = require('../controllers/calendarController');
const userInfoController = require('../controllers/userInfoController');
const sessionController = require('../controllers/sessionController');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.get('/login', loginController.isUserLoggedIn);

router.get('/signup', signUpController.isUserLoggedIn);

router.post('/login', loginController.user_login);

router.post('/signup', signUpController.registerUser);

router.get('/home', homeController.user_home);

router.post('/home', approveController.verify_or_delete_user);

router.get('/workout/:workout_date', workoutController.get_user_day_workout);

router.get('/calendar/:year_month', calendarController.get_month_workout_sessions);
router.get('/calendar/session/:session_id', calendarController.get_workout_session);
router.post('/calendar/session/:session_id', calendarController.complete_workout_session);

router.get('/calender/session/edit/:session_id', calendarController.get_latest_workout_note)
router.post('/calender/session/edit/:session_id', calendarController.edit_workout_note);

router.get('/completedsessionlatestnote/:session_id', trainerClientController.get_latest_workout_note);
router.get('/completedsessionworkout/:session_id', trainerClientController.get_session_workout);
router.get('/completedsessionworkoutexercise/:workout_id', trainerClientController.get_workout_session_exercise);

router.get('/logout', loginController.user_logout);

router.get('/client/:id', trainerClientController.client_info);

router.post('/client/:id', trainerClientController.assign_workout);

router.get('/createworkout', createWorkoutController.create_workout); 

router.post('/createworkout', createWorkoutController.save_workout); 

router.get('/createworkout/:id', createWorkoutController.edit_workout);

router.get('/createexercise', createExerciseController.create_exercise); 

router.post('/createexercise', createExerciseController.save_exercise); 

router.get('/createexercise/:id', createExerciseController.edit_exercise);

router.post('/createexercise/:id', createExerciseController.save_edited_exercise);

router.post('/deleteexercise/:id', createExerciseController.delete_exercise);

router.post('/home', approveController.verify_or_delete_user);

router.get('/userinfo', userInfoController.get_user_info);

router.post('/userinfo', userInfoController.save_user_info);

router.post('/createsession', sessionController.create_session);
 
module.exports = router;