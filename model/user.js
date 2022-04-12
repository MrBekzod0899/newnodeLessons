const {Schema,model}=require('express')

const user=new Schema({
    login:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    },
    img:String,
    logAt:[Date]

})


module.exports=model('User',user)