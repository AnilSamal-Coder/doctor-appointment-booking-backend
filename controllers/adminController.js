import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"


//Login Admin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API for adding doctor
const addDoctor = async (req,res) => {

    try {

      console.log("BODY:", req.body)
      console.log("FILE:", req.file)
      

const name = req.body?.name
const email = req.body?.email
const password = req.body?.password
const speciality = req.body?.speciality
const degree = req.body?.degree
const experience = req.body?.experience
const about = req.body?.about
const fees = req.body?.fees
const address = req.body?.address
const imageFile = req.file

        // checking for all data to add doctor
        if  ( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
            return res.json({success:false,message:"Missing Details"})
        }

        // validating email format
        if ( !validator.isEmail(email) ) {
            return res.json({success:false,message:"Please enter a valid email"})

        }

        // validating strong password
        if ( password.length < 8 ) {
           return res.json({success:false,message:"Please enter a strong password"})
 
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type:"image"
        })
        const imageUrl = imageUpload.secure_url

        //Create Doctor Object

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }

}

export { adminLogin, addDoctor}