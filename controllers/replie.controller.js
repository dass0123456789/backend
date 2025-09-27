import { json } from "express"
import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const createreplie = async (req, res, next) => {
  try {
    const { user_id, thread_id, body } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    if (!body) {
      return createError(400, "Please enter the replie")
    }
    await prisma.replies.create({
      data: {
        user_id,
        thread_id,
        body
      }
    })
    res.json({ msg: "replie success" })
  } catch (error) {
    next(error)
  }
}
export const updatereplie=async(req,res,next)=>{
  try {
    const {replie_id,body}=req.body
  if (!replie_id) {
      return createError(400, "Please enter the replieId")
    }
  if (!body) {
    return createError(400, "Please enter the replie")
  }
  await prisma.replies.update({
    where:{
      replie_id
    },
    data:{
      body,
      updated_at:new Date()
    }
  })
  res.json({msg:"updatereplie success"})
  } catch (error) {
    next(error)
  }
}
export const removereplie=async(req,res,next)=>{
  try {
    const {replie_id}=req.body
    if (!replie_id) {
      return createError(400, "Please enter the replieId")
    }
    await prisma.replies.update({
      where:{
        replie_id
      },
      data:{
        is_deleted:true
      }
    })
    res.json({msg:"deletereplie success"})
  } catch (error) {
    next(error)
  }
}
export const readreplie=async(req,res,next)=>{
  const {id} =req.params
  const replieall=await prisma.replies.findMany({
    where:{
      thread_id:parseInt(id)
    }
  })
  res.json(replieall)
}