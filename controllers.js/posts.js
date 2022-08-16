
import mongoose from "mongoose"
import PostMessage  from "../models/postMessage.js"


export const getposts=async (req,res)=>{
    
    const {page}=req.query


    try {
        
        const LIMIT=8

        const startIndex=(Number(page)-1)*LIMIT //getting the strating index of every post
        const total=await PostMessage.countDocuments({})



        const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
        
        res.status(200).json({data: posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)})
    }
     catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getpost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getpostsbysearch = async (req, res) =>{
    const {searchQuery,tags} = req.query
    try {
        const title=new RegExp(searchQuery, 'i');
        
        const posts=await PostMessage.find({$or :[{title},{tags:{$in:tags.split(',')}}]})

        res.json({data: posts})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createposts= async (req,res)=>{
    const post=req.body;
    const newpost=new PostMessage({...post,creator:req.userId,createdat:new Date().toISOString()})
    try {
       await newpost.save()
       res.status(201).json(newpost)

    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const updatepost=async (req,res)=>{
    const {id:_id}=req.params
    const post=req.body
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatedpost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
  res.json(updatedpost)
}

export const deletepost=async (req,res)=>{
    const {id:_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    await PostMessage.findByIdAndRemove(_id)
    res.json({message:"Post deleted successfully"})
}

export const likepost=async (req,res)=>{
    const {id:_id}=req.params
    // console.log(req.userId)
    if(!req.userId) return res.json({message:"Unauthenticated"})
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const post= await PostMessage.findById(_id)
 
  const index=post.likes.findIndex((_id)=>_id===String(req.userId))

  if(index===-1){
    // if he wants to like the psost 
    post.likes.push(req.userId);
  }else{
    // dislike a post 
    post.likes=post.likes.filter((_id)=>_id!==String(req.userId))
  }

  const updatedpost=await PostMessage.findByIdAndUpdate(_id,post,{new:true})
   res.json(updatedpost)

}