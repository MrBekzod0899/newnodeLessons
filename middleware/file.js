const multer=require('multer')
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'files')
    },
    filename(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g,'-')+'_'+file.originalname)
        // 134r32452345_myjpg.jpg ko'rinishida keladi
    }
})

const arrTypes=['image/jpg','image/png','image/scg+xml','image/jpeg','image/webp']

const fileFilter=(req,file,cb)=>{
    if(arrTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else {
        cb(null,false)
    }
}

module.exports=multer({storage,fileFilter})