const express = require('express')
const app = express()   
const router = express.Router()
const conexion = require('../database/db')
//const LoginController = require('../controllers/LoginController');
const authController = require('../controllers/authControllers')
const crud = require('../controllers/crud')



//router for temlates
router.get('/', authController.isAuthenticated  ,(req, res) => {
    
    res.render('index', {user:req.body.user})
}) 

router.get('/login', (req, res) => {

    res.render('login', {alert:false})
})

router.get('/register', (req, res) => {
    
    res.render('register',{alert:false})
})
router.get('/pages-register', (req, res) => {
    
    // res.render('pages-register')
    conexion.query('SELECT * FROM users', (error, results) => {
                if (error){
                    throw error;
                } else {  res.render('pages-register', {results:results})   }
            })
        })

router.get('/create', (req, res) => {

    conexion.query('SELECT * FROM users', (error, results) => {
        if (error){
            throw error;
        } else {    res.send(results)   }
    })
})
//api user


router.get('/agentes',crud.getAgentes)

router.get('/agentes/:id',crud.getAgente)

router.post('/agentes',crud.createAgentes)

router.patch('/agentes/:id', crud.updateAgentes) //patch apdate parcial

router.delete('/agentes/:id', crud.deleteAgentes)

//edit
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    conexion.query('SELECT * FROM users WHERE id =?',[id],(error, results) => {
        if (error){
            throw error;
        }else {    res.render('edit',{user:results[0]}) 
        
        }
    })
})

//router fot the methods    of the controllers
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout )
module.exports = router
