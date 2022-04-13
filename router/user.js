const {Router}=require('express')
const User=require('../model/user')
const router=Router()
const bcrypt=require('bcryptjs')

router.get('/',async(req,res)=>{
    res.render('back/user/user',{
        layout:'back',
        title:'Admin'
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) throw new Error(err)
        else res.redirect('/')
    })
})

router.get('/login',async(req,res)=>{
    res.render('back/user/login',{
        success:req.flash('success'),
        error:req.flash('error'),
        layout:'auth',
        title:"Tizimga kirish"
    })
})

router.post('/login',async(req,res)=>{
    let {login,password}=req.body
    console.log(req.body)
    let checkUser= await User.findOne({login}).lean()
    if(checkUser){
        let comparePass=await bcrypt.compare(password,checkUser.password)
        if(comparePass){
            req.flash('success','Tizimga xush kelibsiz')
            req.session.user={
                _id:checkUser._id,
                login:checkUser.login,
                password:checkUser.password,
                img:checkUser.img
            }
            req.session.isAuthed=true
            req.session.save(err=>{
                if(err) throw new Error(err)
                else {
                    res.redirect('/admin') 
                }
            })
        }
        else{
            req.flash('error','Your key is incorrect')
            res.redirect('/user/login')
        }
    }
    else{
        req.flash('error','bunday logindagi foydalanauvchi mavjud emas')
        res.redirect('/user/login')
    }
})
router.get('/register',async(req,res)=>{
    res.render('back/user/register',{
        error:req.flash('error'),
        layout:'auth',
        title:"Ro'yhatdan o'tish"
    })
})

router.post('/register',async(req,res)=>{
    let {email,login,password}=req.body
    let checkUser=await User.findOne({login}).lean()
    if(checkUser){
        req.flash('error','bunday foydalanuvchi mavjud')
        res.redirect('/user/register')  
    }
    else{
        let {email,login,password}=req.body
        let hashPass=await bcrypt.hash(password,10)
        const newUser=await new User({email,login,password:hashPass})
        await newUser.save()
        console.log('new user added')
        req.flash('success',"Siz ro'yhatdan muvofaqqiyatli o'tdingiz")
        res.redirect('/user/login')
    }
})

module.exports=router