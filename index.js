const express=require('express')
const app= express()
const mainHbs=require('express-handlebars')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('connect-flash')
const csrf=require('csurf')


const hbs=mainHbs.create({
    defaultLayout:'front',
    extname:'hbs'
})

//handlebars connection code\\
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','temp')

app.use(express.urlencoded({extended:true}))  
app.use(express.static('node_modules'))  //use static file as such as style.css 
app.use(express.static('public'))
app.use('/files',express.static('files'))

//session

app.use(session({
    secret:'Maxfiy raqam',
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*10,
        secure:false
    },
    resave:true
}))
app.use(csrf())
app.use(flash())



//routers list 

let pagerouter=require('./router/page')
let userrouter=require('./router/user')


// connect to router

app.use(pagerouter)
app.use('/user',userrouter)


// connect to mongo db
const PORT=3000;
async function dev(){
 try {
     await mongoose.connect('mongodb://127.0.0.1:27017/portal',{
         useNewUrlParser:true
     })
     app.listen(PORT,()=>{
         console.log(`server is on ${PORT} running`)
     })
 } catch (error) {  
 }
}

dev()