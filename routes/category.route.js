import express from "express"
import {listcategory,readthreadbycategory,readcategory
  ,createcategory,updatecategory,removecategory} from "../controllers/category.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const route=express.Router()
route.get('/listcategory',listcategory)
route.get('/readthreadbycategory/:cat_id',readthreadbycategory)
route.post('/createcategory',verifytoken,createcategory)
route.patch('/updatecategory',verifytoken,updatecategory)
route.delete('/removecategory',verifytoken,removecategory)
route.get('/readcategory/:cat_id',readcategory)
export default route