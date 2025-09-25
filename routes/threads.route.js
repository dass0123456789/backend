import express from "express"
import {
createThread,removethread,updatethread
,listthread,lockthread,unlockthread
} from "../controllers/threads.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const route = express.Router()
route.post('/newthread',verifytoken,createThread)
route.delete('/removethread',verifytoken,removethread)
route.patch('/updatethread',verifytoken,updatethread)
route.get('/listthread',listthread)
route.post('/lockthread',lockthread)
route.post('/unlockthread',unlockthread)
export default route