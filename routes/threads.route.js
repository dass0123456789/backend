import express from "express"
import {
createThread,removethread,updatethread
,listthread,lockthread,unlockthread,readthread
} from "../controllers/threads.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
import {validate,contentschema} from "../utils/validate.js"
const route = express.Router()
route.post('/newthread',validate(contentschema),verifytoken,createThread)
route.delete('/removethread',verifytoken,removethread)
route.patch('/updatethread',validate(contentschema),verifytoken,updatethread)
route.get('/listthread',listthread)
route.post('/lockthread',lockthread)
route.post('/unlockthread',unlockthread)
route.get('/readthread/:thread_id',readthread)
export default route