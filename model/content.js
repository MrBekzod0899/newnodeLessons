const {Schema,model}=require('mongoose')
const content=new Schema({
    title:String,
    description:String,
    context:String,
    cretedAt:{
        type:String,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'Author'
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    Image:String,
    status:{
        type:Number,
        default:0
    },
    slider:{
        type:Number,
        default:0
    },
    bigPopular:{
        type:Number,
        default:0
    },
    hot:{
        type:Number,
        default:0
    },
    topweek:{
        type:Number,
        default:0
    },
    top:{
        type:Number,
        default:0
    },
    popular:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0
    },
    comments:{
        type:String
    },
    hashList:String
})

module.exports=model('Content',content)