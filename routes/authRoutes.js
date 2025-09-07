const express = require('express');
const router = express.Router();
const Authcontrol = require('../controllers/authController');


router.post('/register' , Authcontrol.Register);
router.post('/login' , Authcontrol.login);


module.exports = router;