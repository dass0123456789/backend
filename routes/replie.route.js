import express from "express"
import {createreplie,updatereplie,removereplie,readreplie} from "../controllers/replie.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
import {validate,contentschema} from "../utils/validate.js"
const route=express.Router()
route.post('/newreplie',validate(contentschema),verifytoken,createreplie)
route.patch('/updatereplie',validate(contentschema),verifytoken,updatereplie)
route.delete('/removereplie',verifytoken,removereplie)
route.get('/readreplie/:id',readreplie)
export default route