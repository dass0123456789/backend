import express from "express"
import {reportthread,listreportthread} from "../controllers/report.controller.js"
const route = express.Router()
route.post('/newreport',reportthread)
route.get('/listreport',listreportthread)
export default route