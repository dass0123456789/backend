import express from "express"
import multer from "../middleware/upload.js"
import { verifytoken } from "../middleware/verifytoken.js"
import {createprofile,upprofile} from "../controllers/profile.controller.js"
const route=express.Router()
route.post('/uploadprofile',verifytoken,multer,upprofile)
route.post('/newprofile',verifytoken,createprofile)

export default route