const express=require('express')
const app= express()
const mainHbs=require('express-handlebars')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('connect-flash')
const csrf=require('csurf')
const varMid=require('./middleware/var')
const MongoStore=require('connect-mongodb-session')(session)

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
const mongoURI='mongodb://127.0.0.1:27017/portal'
const store=MongoStore({
    collection:'session',
    uri:mongoURI
})
app.use(session({
    secret:'Maxfiy raqam',
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*10,
        secure:false
    },
    resave:true,
    store
}))
app.use(csrf())
app.use(flash())
app.use(varMid)




//routers list 

let pagerouter=require('./router/page')
let userrouter=require('./router/user')
let categoryRouter=require('./router/category')
let profileRouter=require('./router/profile')


// connect to router

app.use(pagerouter)
app.use('/user',userrouter)
app.use('/category',categoryRouter)
app.use('/profile',profileRouter)


// connect to mongo db
const PORT=3000;
async function dev(){
 try {
     await mongoose.connect(mongoURI,{
         useNewUrlParser:true
     })
     app.listen(PORT,()=>{
         console.log(`server is on ${PORT} running`)
     })
 } catch (error) {  
 }
}

dev()