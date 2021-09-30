const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/signUpController');
const trainerClientController = require('../controllers/trainerClientController');
const createWorkoutController = require('../controllers/createWorkoutController');
const createExerciseController = require('../controllers/createExerciseController');
const clientFriendsController = require('../controllers/clientFriendsController')
const approveController = require('../controllers/approveController')
const calendarController = require('../controllers/calendarController')


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

router.get('/createexercise', createExerciseController.create_exercise); 

router.post('/createexercise', createExerciseController.save_exercise); 

router.post('/home', approveController.verify_or_delete_user);
 
module.exports = router;