import express from "express"
import morgan from "morgan"
import cors from "cors"
import authroute from "./routes/auth.route.js"
import profileroute from "./routes/profile.route.js"
import threadroute from "./routes/threads.route.js"
import replieroute from "./routes/replie.route.js"
import reportroute from "./routes/report.route.js"
import categoryroute from "./routes/category.route.js"
import helmet from 'helmet'
const app =express()
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"]
    }
  }
}));
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',authroute)
app.use('/api',profileroute)
app.use('/api',threadroute)
app.use('/api',replieroute)
app.use('/api',reportroute)
app.use('/api',categoryroute)
app.use((err,req,res,next)=>{
  res.status(err.code||500).json({msg:err.message||"server error"})
})
const port =3000
app.listen(port,()=>{console.log(`start with port ${port}`)})