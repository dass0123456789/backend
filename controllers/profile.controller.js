import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const createprofile = async (req, res, next) => {
  try {
    const { user_id, firstname, lastname, sex,link} = req.body
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
        sex,
        link
      }
    })
    res.json({ msg: "createprofile success" })
  } catch (error) {
    next(error)
  }
}
export const upprofile = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.file = req.file.filename
    }
    console.log(data.file)
    console.log(data)
    await prisma.profile.updateMany({
      where: {
        user_id: parseInt(data.user_id)
      },
      data: {
        picturename: data.file
      }
    })
    res.json({ msg: "uploadprofile success" })
  } catch (error) {
    next(error)
  }
}
export const updateusername = async (req, res, next) => {
  try {
    const { user_id, username } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!username) {
      return createError(400, "Please enter the username")
    }
    const user = await prisma.users.findFirst({
      where: {
        user_id
      }
    })
    if (!user) {
      return createError(400, "user not exists")
    }
    await prisma.users.update({
      where: {
        user_id
      },
      data: {
        username
      }
    })
    res.json({ msg: "update username success" })
  } catch (error) {
    next(error)
  }
}
export const readprofile = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return createError(400, "Please enter the userId")
    }
    const profile = await prisma.profile.findFirst({
      where: {
        user_id: parseInt(id)
      }
    })
    res.json(profile)
  } catch (error) {
    next(error)
  }
}
export const updatefirstname = async (req, res, next) => {
  try {
    const { user_id, firstname } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!firstname) {
      return createError(400, "Please enter the firstname")
    }
    const user = await prisma.profile.findFirst({
      where: {
        user_id
      }
    })
    if (!user) {
      return createError(400, "user not exists")
    }
    await prisma.profile.updateMany({
      where: {
        user_id
      },
      data: {
        firstname
      }
    })
    res.json({ msg: "updatefirstname success" })
  } catch (error) {
    next(error)
  }
}
export const updatelastname = async (req, res, next) => {
  try {
    const { user_id, lastname } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!lastname) {
      return createError(400, "Please enter the lastname")
    }
    const user = await prisma.profile.findFirst({
      where: {
        user_id
      }
    })
    if (!user) {
      return createError(400, "user not exists")
    }
    await prisma.profile.updateMany({
      where: {
        user_id
      },
      data: {
        lastname
      }
    })
    res.json({ msg: "updatelastname success" })
  } catch (error) {
    next(error)
  }
}
export const updateemail = async (req, res, next) => {
  try {
    const { user_id, email } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!email) {
      return createError(400, "Please enter the email")
    }
    const user = await prisma.users.findFirst({
      where: {
        user_id
      }
    })
    if (!user) {
      return createError(400, "user not exists")
    }
    await prisma.users.update({
      where: {
        user_id
      },
      data: {
        email
      }
    })
    res.json({ msg: "update email success" })
  } catch (error) {
    next(error)
  }
}
export const updatesex = async (req, res, next) => {
  try {
    const { user_id, sex } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!sex) {
      return createError(400, "Please select the sex")
    }
    const user = await prisma.profile.findFirst({
      where: {
        user_id
      }
    })
    if (!user) {
      return createError(400, "user not exists")
    }
    await prisma.profile.update({
      where: {
        user_id:user.profile_id
      },
      data: {
        sex
      }
    })
    res.json({ msg: "updatesex success" })
  } catch (error) {
    next(error)
  }
}
export const amounuser = async (req, res, next) => {
  try {
    const user = await prisma.users.findMany()
    let count = 0
    user.map((c) => {
      count++
    })
    res.json({ amounuser: count })
  } catch (error) {
    next(error)
  }
}
export const listuser = async (req, res, next) => {
  try {
    const user = await prisma.users.findMany({
      select: {
        user_id: true,
        username: true,
        email: true,
        role: true
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}
export const readuser = async (req, res, next) => {
  try {
    const { user_id } = req.params
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    const usercheck = await prisma.users.findFirst({
      where: {
        user_id: parseInt(user_id)
      }
    })
    if (!usercheck) {
      return createError(400, "This user does not exist")
    }
    const user = await prisma.users.findFirst({
      where: {
        user_id: parseInt(user_id)
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        role: true
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}
export const updaterole = async (req, res, next) => {
  try {
    const { user_id, role } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if(!role){
      return createError(400, "Please select the role")
    }
    const usercheck = await prisma.users.findFirst({
      where: {
        user_id
      }
    })
    if (!usercheck) {
      return createError(400, "This user does not exist")
    }
    await prisma.users.update({
      where: {
        user_id: parseInt(user_id)
      },
      data: {
        role
      }
    })
    res.json({ msg: "updaterole success" })
  } catch (error) {
    next(error)
  }
}
export const updatelink=async(req,res,next)=>{
  try {
    const {user_id,link}=req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!user_id) {
      return createError(400, "Please enter the Link")
    }
    const profile=await prisma.profile.findFirst({
      where:{
        user_id
      }
    })
    if(!profile){
      return createError(400, "This profile does not exist")
    }
    await prisma.profile.update({
      where:{
        profile_id:profile.profile_id
      },
      data:{
        link
      }
    })
    res.json({msg:'updatelink success'})
  } catch (error) {
    next(error)
  }
}