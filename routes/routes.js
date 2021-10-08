const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/signUpController');
const trainerClientController = require('../controllers/trainerClientController');
const createWorkoutController = require('../controllers/createWorkoutController');
const createExerciseController = require('../controllers/createExerciseController');
const clientFriendsController = require('../controllers/clientFriendsController');
const approveController = require('../controllers/approveController');
const calendarController = require('../controllers/calendarController');
const userInfoController = require('../controllers/userInfoController');
const workoutPageController = require('../controllers/workoutPageController');
const friendPageController = require('../controllers/friendPageController');


const router = express.Router();

router.get('/login', loginController.isUserLoggedIn);

router.get('/signup', signUpController.isUserLoggedIn);

router.post('/login', loginController.user_login);

router.post('/signup', signUpController.registerUser);

router.get('/home', homeController.user_home);

router.post('/home', approveController.verify_or_delete_user);

router.get('/home', clientFriendsController.user_friends);

router.get('/home', calendarController.get_workout)

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

router.post('/home', approveController.verify_or_delete_user);

router.get('/userinfo', userInfoController.get_user_info);

router.post('/userinfo', userInfoController.save_user_info);

router.get('/workoutpage/:id', workoutPageController.show_workout);

router.get('/friendPage/:id', friendPageController.friend_home);
 
module.exports = router;