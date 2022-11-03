const express = require ('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express()

app.use(express.static(__dirname +'/views'));
//motor templates
app.set('view engine', 'ejs')
//set to public para archivos extaiticos
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

//procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

dotenv.config({path: './env/.env'})

app.use(cookieParser())
app.get('/indexadmin', (req, res) => {
    

    
    res.sendFile(__dirname +"/views/indexAdmin.html");
    
    
        
        
    
})
//llamar al router
app.use('/', require('./routes/router'))

//eliminar Cache 
// app.use(function(req, res, next) {
//     if(!req.user){
//         res.render('Cache - Control', 'private, no cache no - store, must-relvalite' )
//         return next()
//     }
        
// });

    app.listen(process.env.PORT, () =>{
        console.log('http://localhost:'+process.env.PORT)
    })

