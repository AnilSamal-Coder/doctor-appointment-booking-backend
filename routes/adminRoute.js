import express from "express"
import { adminLogin, addDoctor } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js"


const adminRouter = express.Router()

// Login Route
adminRouter.post("/login", adminLogin)

//Add Doctor

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor)

export default adminRouter 