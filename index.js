const express=require('express')
const app= express()
const mainHbs=require('express-handlebars')
const mongoose=require('mongoose')

const hbs=mainHbs.create({
    defaultLayout:'main',
    extname:'hbs'
})

//handlebars connection code\\
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','temp')

app.use(express.urlencoded({extended:true}))  
app.use(express.static('node_modules'))  //use static file as such as style.css 
app.use(express.static('public'))



//routers list 

let pagerouter=require('./router/page')



//routers list 

app.use(pagerouter)
app.use('/files',express.static('files'))

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