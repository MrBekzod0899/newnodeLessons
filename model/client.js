const {Schema,model}=require('mongoose')

const client=new Schema({
    name:String,
    age:Number,
    avatar:String,
    gender:{
        type:String,
        enum:['MALE',"FEMALE"]
    },
    company:Schema.Types.ObjectId,
    phone:String,
    email:{
        type:String,
        default:'admin123@gmail.com'
    }
})

module.exports=model('Client',client)