const {Router}=require('express')
const router=Router()

router.get('/',async(req,res)=>{
    res.render('back/profile/profile',{
        layout:'back',
        isProfile:true,
        text:"Profile"
    })
})

module.exports=router