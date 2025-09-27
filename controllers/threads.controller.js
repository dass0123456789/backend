import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const createThread=async(req,res,next)=>{
  try {
    const {user_id,title,body,cat_id}=req.body
    if(!user_id){
      return createError(400,"Please enter the userId")
    }
    if(!title){
      return createError(400,"Please enter the Title")
    }
    if(!body){
      return createError(400,"Please enter the Thead")
    }
    if(!cat_id){
      return createError(400,"Please select the Category")
    }
    await prisma.threads.create({
      data:{
        user_id,
        title,
        body,
        cat_id
      }
    })
    res.json({msg:"createthread success"})
  } catch (error) {
    next(error)
  }
}
export const removethread=async(req,res,next)=>{
  try {
    const {thread_id}=req.body
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    await prisma.threads.update({
      where:{
        thread_id
      },
      data:{
        is_deleted:true
      }
    })
    res.json({msg:"deletethread success"})
  } catch (error) {
    next(error)
  }
}
export const updatethread=async(req,res,next)=>{
  try {
    const {thread_id,body} =req.body
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    if(!body){
      return createError(400,"Please enter the updateThead")
    }
    await prisma.threads.update({
      where:{
        thread_id
      },
      data:{
        body,
        updated_at:new Date()
      }
    })
    res.json({msg:"updatethread success"})
  } catch (error) {
    next(error)
  }
}
export const listthread=async(req,res,next)=>{
  try {
    const threads=await prisma.threads.findMany()
    let count=0
    threads.map((c)=>{
      if(c.is_deleted!==true){
        count++
      }
    })
    res.json({threads,
      threadamounall:count
    })
  } catch (error) {
    next(error)
  }
}
export const lockthread=async(req,res,next)=>{
  try {
    const {thread_id}=req.body
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    await prisma.threads.update({
      where:{
        thread_id
      },
      data:{
        is_locked:true
      }
    })
    res.json({msg:"lockthread success"})
  } catch (error) {
    next(error)
  }
}
export const unlockthread=async(req,res,next)=>{
  try {
    const {thread_id}=req.body
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    await prisma.threads.update({
      where:{
        thread_id
      },
      data:{
        is_locked:false
      }
    })
    res.json({msg:"unlockthread success"})
  } catch (error) {
    next(error)
  }
}
export const readthread=async(req,res,next)=>{
  try {
    const {thread_id}=req.params
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    const thread=await prisma.threads.findFirst({
      where:{
        thread_id:parseInt(thread_id)
      }
    })
    res.json(thread)
  } catch (error) {
    next(error)
  }
}
