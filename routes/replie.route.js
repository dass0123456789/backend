import express from "express"
import {createreplie,updatereplie,removereplie} from "../controllers/replie.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const route=express.Router()
route.post('/newreplie',verifytoken,createreplie)
route.patch('/updatereplie',verifytoken,updatereplie)
route.delete('/removereplie',verifytoken,removereplie)
export default route