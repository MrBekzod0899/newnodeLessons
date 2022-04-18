const {Router}=require('express')
const router=Router()
const Author=require('../model/author')
const Category=require('../model/category')
const Content=require('../model/content')
const auth=require('../middleware/auth')
const upload =require('../middleware/file')

router.get('/',auth,async(req,res)=>{
    let categories=await Category.find({status:1}).lean()
    let authors=await Author.find({status:1}).lean()
    let contents= await Content.find().populate('category').populate('author').lean()
    contents=contents.map(content=>{
        content.status=content.status==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.hot=content.hot==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.topweek=content.topweek==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.top=content.top==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.popular=content.popular==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.slider=content.slider==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.bigPopular=content.bigPopular==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        return content
    })
    res.render('back/content/content',{
        layout:'back',
        isNews:true,
        contents,
        authors,
        categories,
        text:"Bo'limlar"
    })
})

router.post('/',upload.single('Image'),auth,async(req,res)=>{
    console.log(req.body)
    let {title,description,context,author,category,status,hot,top,slider,bigPopular,topweek,popular,hashList}=req.body
    let Image='no photo'
    if(req.file){
         Image=req.file.path
    }
    status= status==1 ? status :0
    top= top==1 ? top :0
    topweek= topweek==1 ? topweek :0
    popular= popular==1 ? popular :0
    hot= hot==1 ? hot :0
    slider= slider==1 ? slider :0
    bigPopular= bigPopular==1 ? bigPopular :0
    let view=0
    let comments=0
    let cretedAt=Date.now()
    let newContent=await new Content({title,description,context,author,category,Image,status,hot,top,topweek,popular,hashList,view,comments,cretedAt})
    newContent.save()
    res.redirect('/news')
})

router.get('/delete/:id',auth,async(req,res)=>{
    let _id=req.params.id
    await Content.findByIdAndRemove({_id})
    res.redirect('/news')
})

router.get('/show/:id',async(req,res)=>{
    let _id=req.params.id
    console.log(_id)
    let content=await Content.findOne({_id}).populate('author').populate('category').lean() 
        content.status=content.status==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.hot=content.hot==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.topweek=content.topweek==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.top=content.top==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.popular=content.popular==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.slider=content.slider==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'
        content.bigPopular=content.bigPopular==1 ? '<span class="badge badge-success">Ha</span>' :'<span class="badge badge-danger">Yo`q</span>'

    res.render('back/content/show',{
        isNews:true,
        layout:'back',
        content,
        text:`news / show`
    })
})

router.get('/get/:id',auth,async(req,res)=>{
    let _id=req.params.id
    let editContent=await Content.findOne({_id}).populate('author').populate('category').lean()
    console.log(_id,editContent)
    res.send(editContent)
})

router.post('/save',auth,upload.single('Image'),async(req,res)=>{
    console.log(req.body)
    let {_id,title,description,context,author,category,hashList}=req.body
    let obj={
        title,
        description,
        context,
        author,
        category,
        hashList
    }
    if(req.file){
         obj.Image=req.file.path
    }
    await  Content.findByIdAndUpdate(_id,obj)
    res.redirect('/news')
})

router.get('/:type/:id',async(req,res)=>{
    let type=req.params.type
    let _id=req.params.id
    console.log(type)
    console.log(_id)
    console.log(_id,type)
    let content= await Content.findOne({_id})
    if(content[type]==1){
        content[type]=0 
    }
    else{
        content[type]=1
    }
    console.log(content)
    await Content.findByIdAndUpdate(_id,content)
    if(type===''){
        res.redirect(`/news/${_id}`)
    }
    else{
        res.redirect(`/news/show/${_id}`)
    }
})


module.exports=router