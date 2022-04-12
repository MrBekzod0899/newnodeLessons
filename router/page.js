const {Router} =require('express')
const router=Router()
const auth=require('../middleware/auth')


router.get('/',(req,res)=>{
    res.render('front/index',{
        title:'Foydalanuvchi Kabineti'
    })
})


router.get('/admin',auth,async(req,res)=>{
    res.render('back/dashboard',{
        layout:'back',
        title:'Admin Panel'
    })
})



module.exports=router