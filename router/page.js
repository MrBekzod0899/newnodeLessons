const {Router} =require('express')

const router=Router()

router.get('/',(req,res)=>{
    res.render('index',{
        isHome:true
    })
})


router.get('/admin',async(req,res)=>{
    res.render('dashboard',{
        layout:'back'
    })
})



module.exports=router