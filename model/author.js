const {Schema,model}=require('mongoose')

const author=new Schema({
    name:String,
    avatar:String,
    status:{
        type:Number,
        default:0
    }
})

module.exports=model('Author',author)