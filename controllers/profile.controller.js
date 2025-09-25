import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const createprofile = async (req, res, next) => {
  try {
    const { user_id, firstname, lastname, sex } = req.body
    const a = req.body
    console.log(a)
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!firstname) {
      return createError(400, "Please enter the firstname")
    }
    if (!lastname) {
      return createError(400, "Please enter the lastname")
    }
    if (!sex) {
      return createError(400, "Please select the sex")
    }
    await prisma.profile.create({
      data: {
        user_id,
        firstname,
        lastname,
        sex
      }
    })
    res.json({ msg: "createprofile success" })
  } catch (error) {
    next(error)
  }
}
export const upprofile =async(req, res,next) => {
  try {
    let data = req.body
  if (req.file) {
    data.file = req.file.filename
  }
  console.log(data.file)
  console.log(data)
  await prisma.profile.updateMany({
    where:{
      user_id:parseInt(data.user_id)
    },
    data:{
      picturename:data.file
    }
  })
  res.json({msg:"uploadprofile success"})
  } catch (error) {
    next(error)
  }
}