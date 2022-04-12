const {Router}=require('express')

const router=Router()


router.get('/',async(req,res)=>{
    res.render('back/user/user',{
        layout:'back',
        title:'Admin'
    })

})

router.get('/login',async(req,res)=>{
    res.render('back/user/login',{
        layout:'auth',
        title:"Tizimga kirish"
    })
})
router.get('/register',async(req,res)=>{
    res.render('back/user/register',{
        layout:'auth',
        title:"Ro'yhatdan o'tish"
    })
})


module.exports=router