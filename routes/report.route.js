import express from "express"
import { verifytoken } from "../middleware/verifytoken.js"
import {reportthread,listreportthread} from "../controllers/report.controller.js"
const route = express.Router()
route.post('/newreport',verifytoken,reportthread)
route.get('/listreport',listreportthread)
export default route