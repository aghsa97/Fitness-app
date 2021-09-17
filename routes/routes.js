const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.post('/auth', loginController.user_login);

router.get('/home', homeController.user_home);

router.get('/logout', loginController.user_logout);
    
module.exports = router;