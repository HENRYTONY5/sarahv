const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util') //promesas comunicacion asincronas retorno favorable o no funcioan corectamente reject
// const { json } = require('body-parser')

exports.register = async(req, res) =>{
    try {
    const name = req.body.name
    const user = req.body.user
    const phone = req.body.phone
    const password = req.body.pass
    const passHash = await bcryptjs.hash(password, 8)
    console.log(name +" - "+user+" - "+ phone+" - "+password)
    console.log("PASS_HASH: " +" - "+passHash+" - ")
    if(!user || !password || !phone || !name) {
        res.render('login', {
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor llene todos los campos. " ,
            alertIcon:'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
    } else {    conexion.query('INSERT INTO users SET ?', {user: name,  phone: phone,  name:user, pass:passHash}, (error, results) =>{

        if(error) { console.log(error) } 
        res.render('login', {
            alert:true,
            alertTitle: "Agente Registrado.",
            alertMessage: "Registro Exitoso. " ,
            alertIcon:'success',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
        // res.redirect('/')
    }) }

        
    } catch (error) {
        console.log(error)
    }
    
}

exports.login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass
        console.log(user, pass);

        if(!user || !pass) {
            res.render('login', {
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Por favor ingrese un nombre de usuario y password" ,
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else {     conexion.query('Select * FROM USERS WHERE name = ?', [user], async (error, results) =>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass)   )){
                res.render('login', {
                    alert: true,
                    alertTitle: "Advertencia Error",
                        alertMessage: "Nombre de usuario o contraseña incorrectos",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                })
            }   else { 
                const id= results[0].id
                const token = jwt.sign({id:id}  ,process.env.JWT_SECRETO,{
                    
                
                }  ) 
                console.log("TOKEN: "+ token+"para el usuario: " +user ) 
                const cookieOptions = {
                    expiresIn: new Date(Date.now() +process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                
        }
        res.cookie('jwt', token, cookieOptions)
        res.render('login',{
            alert:true,
            alertTitle: "Advertencia: Login success",
            alertMessage: "Conectado con tu cuenta",
            alertIcon:'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
        })
                }
            })
        
        }

    } catch (error){ console.log(error)}
}

exports.isAuthenticated= async (req, res, next) => {

    if (req.cookies.jwt){
        try {
            const decodedToken = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM USERS WHEN id = ',[decodedToken].id, (error, results) => {
                if(!results){   return next()}
                req.user = results[0]
                return next()
            }) 
        } catch (error) {
            console.log(error)
            return next()
        } 
    }   else {
        res.redirect('/login')
        
    }
}

exports.logout = (req, res) =>{
    res.clearCookie('jwt')
    return res.redirect('/')
}