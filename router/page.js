const {Router} =require('express')
const router=Router()
const auth=require('../middleware/auth')
const Content=require('../model/content')
const Author=require('../model/author')
const Category=require('../model/category')

router.get('/',async(req,res)=>{
    let contents=await Content.find({status:1}).populate('author').populate('category').lean()
    contents= contents.map(content=>{
        
       let data =content.cretedAt
        
        console.log(data.toLocaleString())
        return content
    })

    res.render('front/index',{
        title:'Foydalanuvchi Kabineti',
        contents
    })
})


router.get('/admin',auth,async(req,res)=>{
    res.render('back/dashboard',{
        layout:'back',
        isHome:true,
        text:'Bosh sahifa',
        title:'Admin Panel'
    })
})



module.exports=router