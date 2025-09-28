import express from "express"
import multer from "../middleware/upload.js"
import { verifytoken } from "../middleware/verifytoken.js"
import {validate,updateemailcheema} from "../utils/validate.js"
import {createprofile,upprofile,updateusername,
readprofile,updateemail,updatefirstname
,updatelastname,updatesex,amounuser} from "../controllers/profile.controller.js"
const route=express.Router()
route.post('/uploadprofile',verifytoken,multer,upprofile)
route.post('/newprofile',verifytoken,createprofile)
route.patch('/updateusername',verifytoken,updateusername)
route.get('/readprofile/:id',verifytoken,readprofile)
route.patch('/updateemail',verifytoken,validate(updateemailcheema),updateemail)
route.patch('/updatefirstname',verifytoken,updatefirstname)
route.patch('/updatelastname',verifytoken,updatelastname)
route.patch('/updatesex',verifytoken,updatesex)
route.get('/amounuser',amounuser)
export default route