import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
import redisClient from "../config/redis.js"
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
    await redisClient.del('report')
    res.json({msg:"report success"})
  } catch (error) {
    next(error)
  }
}
export const listreportthread=async(req,res,next)=>{
  try {
    const reportCache=await redisClient.get('report')
    if(reportCache){
      return res.json(JSON.parse(reportCache))
    }
    const allreport=await prisma.report.findMany();
    await redisClient.setEx('report',3600,JSON.stringify(allreport, null, 4))
    res.json(allreport)
  } catch (error) {
    next(error)
  }
}