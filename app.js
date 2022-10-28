const express = require ('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()

//motor templates
app.set('view engine', 'ejs')
//set to public para archivos extaiticos
app.use(express.static('public'))

//procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

dotenv.config({path: './env/.env'})

app.use(cookieParser())

//llamar al router
app.use('/', require('./routes/router'))
//eliminar Cache 
app.use(function(req, res, next) {
    if(!req.user){
        res.render('Cache - Control', 'private, no cache no - store, must-relvalite' )
        next()
    }
        
});

app.listen(3010, () =>{
    console.log('Server UP & started on port: http://localhost:3010')
})

