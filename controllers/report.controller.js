import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const reportthread =async(req,res,next)=>{
  try {
    const{user_id,thread_id,report_title}=req.body
    if(!user_id){
      return createError(400,"Please enter the userId")
    }
    if(!thread_id){
      return createError(400,"Please enter the TheadId")
    }
    if(!report_title){
      return createError(400,"Please enter the select ReportTitle")
    }
    await prisma.report.create({
      data:{
        user_id,
        thread_id,
        report_title
      }
    })
    res.json({msg:"report success"})
  } catch (error) {
    next(error)
  }
}
export const listreportthread=async(req,res,next)=>{
  try {
    const allreport=await prisma.report.findMany();
    res.json(allreport)
  } catch (error) {
    next(error)
  }
}