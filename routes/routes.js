const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');//middleware d'authentification
const loginController = require('../controllers/login');
const registerController = require('../controllers/register');
const middleware = require('../middleware/auth');
const s = require('../controllers/sendmail');

//les routes


router.post('/register', registerController.register);
router.get('/confirm-mail',registerController.confirm );  
router.post('/login', loginController.login); // login et retourner l'id du user ainsi que le token
module.exports = router;