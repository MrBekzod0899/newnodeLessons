const {Router}=require('express')
const router=Router()
const auth=require('../middleware/auth')
router.get('/',auth,async(req,res)=>{
    res.render('back/profile/profile',{
        layout:'back',
        isProfile:true,
        text:"Profile"
    })
})

module.exports=router