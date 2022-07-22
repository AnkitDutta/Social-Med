const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const authenticate =async (req, res, next) =>{
    try{
        const token = req.cookies.jwToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})

        if(!rootUser){
            throw new Error("User not Found");
        }
        req.token = token;
        req.rootUser = rootUser; 
        req.userId = rootUser._id;
        next();

    }catch(err){
        res.status(401).send("Unauthorized");
    }
}

module.exports = authenticate;