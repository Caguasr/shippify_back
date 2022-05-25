import express, {Express} from 'express'
import dotenv from "dotenv";
import {routeVehicles} from "./routes/vehiclesRouter";
import cors from "cors"
dotenv.config()
const PORT : number | string = process.env.PORT || 5000

const app : Express = express();
app.use(cors())
app.use(express.json())
app.use("/api/vehicles", routeVehicles)



app.listen(PORT, ()=> {
    console.log(`SERVER UP ON PORT ${PORT}`)
})