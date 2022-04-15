const {Router}=require('express')
const router=Router()
const Category=require('../model/category')
const auth=require('../middleware/auth')

router.get('/',auth,async(req,res)=>{
    let categories=await Category.find().lean()
    categories=categories.map(category=>{
        category.status=category.status==1 ? '<span class="badge badge-success">Faol</span>' :'<span class="badge badge-danger">Faol emas</span>'
        category.menu=category.menu==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        category.footer=category.footer==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        return category
    })
    res.render('back/category/category',{
        layout:'back',
        isCategory:true,
        categories,
        text:"Bo'limlar"
    })
})

router.post('/',auth,async(req,res)=>{
    let {title,order,status,footer,menu}=req.body
    status=status==1 ? status :0
    menu=menu==1 ? menu :0
    footer= footer==1 ? footer :0
    let newCategory=await new Category({title,order,status,menu,footer})
    newCategory.save()
    res.redirect('/category')
})

router.get('/delete/:id',auth,async(req,res)=>{
    let _id=req.params.id
    await Category.findByIdAndRemove({_id})
    res.redirect('/category')
})

router.get('/get/:id',auth,async(req,res)=>{
    let _id=req.params.id
    let editCategory=await Category.findOne({_id}).lean()
    res.send(editCategory)
})

router.post('/save',auth,async(req,res)=>{
    let {title,order,status,footer,menu,_id}=req.body
    status=status==1 ? status :0
    menu=menu==1 ? menu :0
    footer= footer==1 ? footer :0
    await  Category.findByIdAndUpdate(_id,{title,order,status,menu,footer})
    res.redirect('/category')
})

router.get('/:type/:id',async(req,res)=>{
    let type=req.params.type
    let _id=req.params.id
    console.log(_id,type)
    let category= await Category.findOne({_id})
    if(category[type]==1){
        category[type]=0 
    }
    else{
        category[type]=1
    }
    await Category.findByIdAndUpdate(_id,category)
    res.redirect('/category')
})

router.get('/all',async(req,res)=>{
    let statusCategory=await Category.find({status:1}).lean()
    let footerCategory=await Category.find({footer:1}).lean()
    let menuCategory=await Category.find({menu:1}).lean()
    res.send({statusCategory,footerCategory,menuCategory})
})
module.exports=router