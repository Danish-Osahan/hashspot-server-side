import mongoose from "mongoose";
// const {Schema}=mongoose

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedfile:String,
    likes:{
        type:[String],
        default:[],
    },
    createdat:{
        type:Date,
        default:new Date()
    }

})

const PostMessage=mongoose.model('PostMessage',postSchema);

export default PostMessage