const express = require('express')
const router = express.Router()
const conexion = require('../database/db')
//const LoginController = require('../controllers/LoginController');
const authController = require('../controllers/authControllers')

//router for temlates
router.get('/', (req, res) => {
    
    res.render('index')
})

router.get('/login', (req, res) => {

    res.render('login', {alert:false})
})

router.get('/register', (req, res) => {

    res.render('register')
})

//router fot the methods    of the controllers
router.post('/register', authController.register)
router.post('/login', authController.login)
module.exports = router
