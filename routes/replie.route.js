import express from "express"
import {createreplie,updatereplie,removereplie,listreplie} from "../controllers/replie.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const route=express.Router()
route.post('/newreplie',verifytoken,createreplie)
route.patch('/updatereplie',verifytoken,updatereplie)
route.delete('/removereplie',verifytoken,removereplie)
route.get('/listreplie',listreplie)
export default route