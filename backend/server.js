import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




// app config

const app = express()
const port = 4000    //where our server will be running


// middleware, here we initialize our middleware
app.use(express.json())   //using this middleware, whenever we get the request from frontend to backend, that will be passed using json
app.use(cors()) //using this we can access the backend from any frontend

//db connection
connectDB();




// API endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req, res)=> {
   res.send("API working")     //when we use /, we will get this message
} )//request data from server


//run express server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);

})


// mongodb+srv://snehashrestha357:Sneha1234@cluster0.qhcnodd.mongodb.net/