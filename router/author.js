const {Router}=require('express')
const Author = require('../model/author')
const upload=require('../middleware/file')
const auth=require('../middleware/auth')

const router=Router()


router.get('/',auth,async(req,res)=>{
    let authors=await Author.find().lean()

    authors=authors.map(author=>{
            author.status===1 ?
            author.status=`<span class="badge badge-pill badge-success">faol</span>`
            : author.status=`<span class="badge badge-pill badge-danger">no faol</span>`
        return author
    })
    res.render('back/author/author',{
        layout:'back',
        isAuthor:true,
        authors
    })
})

router.post('/',upload.single('avatar'),async(req,res)=>{
    let {name,status}=req.body
    let avatar='no-image'
    if(req.file){
        avatar=req.file.path
    }
    status=status || 0
  
    let newAuthor=await new Author({name,status,avatar})
    await newAuthor.save()
    res.redirect('/author')
})

router.get('/delete/:id',auth,async(req,res)=>{
    let _id=req.params.id
    await Author.findByIdAndRemove({_id})
    req.flash('success','Muallif muvofaqqiyatli bazadan o`chirildi')
    res.redirect('/author')
})

router.get('/get/:id',auth,async(req,res)=>{
    let _id=req.params.id
    let getAuthor=await Author.findOne({_id}).lean()
    res.send(getAuthor)
})

router.get('/status/:id',async(req,res)=>{
    let _id=req.params.id
    let status=0
    let AuthorStatus=await Author.findOne({_id})
    if(AuthorStatus.status !==1){
        status=1
    }
    await Author.findByIdAndUpdate(_id,{status})
    res.redirect('/author')
})
router.post('/save',upload.single('avatar'),auth,async(req,res)=>{
    let {_id,name}=req.body
    console.log(req.body)
    let avatar ='no-image'
    if(req.file){
        avatar=req.file.path
    }
    await Author.findByIdAndUpdate(_id,{name,avatar})
    res.redirect('/author')
})

module.exports=router