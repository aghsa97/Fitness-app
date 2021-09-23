const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/signUpController');
const trainerClientController = require('../controllers/trainerClientController');

var path = require('path');

const router = express.Router();

router.get('/login', loginController.isUserLoggedIn);

router.get('/signup', signUpController.isUserLoggedIn);

router.post('/login', loginController.user_login);

router.post('/signup', signUpController.registerUser);

router.get('/home', homeController.user_home);

router.get('/logout', loginController.user_logout);

router.get('/client/:id', trainerClientController.client_info);



/*
router.get('/client/:id', function(request, response){
    console.log(request.params)
    response.render(path.join(__dirname, "../views/trainerViews/clientInfo"))
});
*/
    
module.exports = router;