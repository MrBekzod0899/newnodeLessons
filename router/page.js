const {Router} =require('express')
const router=Router()
const auth=require('../middleware/auth')
const Content=require('../model/content')
const Author=require('../model/author')
const Category=require('../model/category')

router.get('/',async(req,res)=>{
    let contents=await Content.find({status:1}).populate('author').populate('category').lean()
    let recentStories= await Content.find({status:1}).sort({_id:-1}).limit(3).populate('author').populate('category').lean()
    let otherNews=await Content.find({status:1}).sort({_id:-1}).limit(3).populate('author').populate('category').skip(3).lean()
    
    contents= contents.map(content=>{
       let data =new Date(content.cretedAt.toLocaleString())
        content.cretedAt=`${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`
        return content
    })
    otherNews= otherNews.map(content=>{
        let data =new Date(content.cretedAt.toLocaleString())
         content.cretedAt=`${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`
         return content
     })
    recentStories= recentStories.map(item=>{
        let data =new Date(item.cretedAt.toLocaleString())
         item.cretedAt=`${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`
         return item
     })

    res.render('front/index',{
        title:'Foydalanuvchi Kabineti',
        contents,
        recentStories,
        otherNews
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

router.get('/all',async(req,res)=>{
    let allNews=await Content.find().populate('author').populate('category').lean()
    allNews= allNews.map(content=>{
        let data =new Date(content.cretedAt.toLocaleString())
         content.cretedAt=`${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`
         return content
     })

     res.render('front/all/all',{
         layout:'front',
         allNews
     })
})


module.exports=router