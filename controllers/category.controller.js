import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
export const listcategory = async (req, res, next) => {
  try {
    const cat = await prisma.category.findMany()
    res.json(cat)
  } catch (error) {
    next(error)
  }
}
export const readthreadbycategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params
    if (!cat_id) {
      return createError(400, "Please enter the CategoryId")
    }
    const cat = await prisma.category.findMany({
      where: {
        cat_id: parseInt(cat_id)
      }
    })
    if (cat.length===0) {
      return createError(400, "This category does not exist")
    }
    res.json(cat)
  } catch (error) {
    next(error)
  }
}
export const createcategory = async (req, res, next) => {
  try {
    const { cat_name } = req.body
    if (!cat_name) {
      return createError(400, "Please enter the CategoryName")
    }
    await prisma.category.create({
      data: {
        cat_name
      }
    })
    res.json({ msg: "createcategory success" })
  } catch (error) {
    next(error)
  }
}
export const updatecategory = async (req, res, next) => {
  try {
    const { cat_id, cat_name } = req.body
    if (!cat_id) {
      return createError(400, "Please enter the CategoryID")
    }
    if (!cat_name) {
      return createError(400, "Please enter the CategoryName")
    }
    const cat = await prisma.category.findFirst({
      where: {
        cat_id
      }
    })
    if (!cat) {
      return createError(400, "This category does not exist")
    }
    await prisma.category.updateMany({
      where: {
        cat_id
      },
      data: {
        cat_name
      }
    })
    res.json({ msg: "updatecategory success" })
  } catch (error) {
    next(error)
  }
}
export const removecategory = async (req, res, next) => {
  try {
    const { cat_id } = req.body
    if (!cat_id) {
      return createError(400, "Please enter the CategoryID")
    }
    const cat = await prisma.category.findFirst({
      where: {
        cat_id
      }
    })
    if (!cat) {
      return createError(400, "This category does not exist")
    }
    await prisma.category.update({
      where: {
        cat_id
      },
      data: {
        is_delete: true
      }
    })
    res.json({ msg: "deletecategory success" })
  } catch (error) {
    next(error)
  }
}
export const readcategory=async(req,res,next)=>{
  try {
    const {cat_id}=req.params
    if (!cat_id) {
      return createError(400, "Please enter the CategoryID")
    }
    const cat=await prisma.category.findFirst({
      where:{
        cat_id:parseInt(cat_id)
      }
    })
    if(!cat){
      return createError(400, "This category does not exist")
    }
    res.json(cat)
  } catch (error) {
    next(error)
  }
}