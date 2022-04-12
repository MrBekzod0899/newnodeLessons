const {Router}=require('express')
const router=Router()
const Category=require('../model/category')
const auth=require('../middleware/auth')
router.get('/',auth,async(req,res)=>{

    let categories=await Category.find().lean()
    res.render('back/category/category',{
        layout:'back',
        isCategory:true,
        categories
    })
})

module.exports=router