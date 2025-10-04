import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Middleware from "../middleware/Middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(401)
                .json({ suceess: false, message: "User already exist" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPass,
        });
        await newUser.save();
        return res
            .status(200)
            .json({ success: true, message: "Account Created Successfully!" });
    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json({ success: false, message: "Error in Adding data" })
    }
});
router.post("/login", async (req, res) => {
    try {
        console.log('login')
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "user not exist" })
        }
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" })
        }
        const token = jwt.sign({id:user._id},"secretkeyofnoteapp",{expiresIn:"5h"})
        return res
            .status(200)
            .json({ success: true, token, user:{name:user.name},message: "LogIn successful" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Error in Login Server" })

    }
})

router.get("/verify",Middleware,async(req,res) =>{
    try{
        return res.status(200)
        .json({success:true , userDetail: req.user})
    }catch(err){
        return res
            .status(500)
            .json({ success: false, message: "Error in Login Server" })

    }

}
)
export default router 
