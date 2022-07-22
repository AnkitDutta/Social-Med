const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authenticate = require("../middleware/authenticate"); 

dotenv.config();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//REFRESH
// router.post("/refresh", async (req,res)=>{
//     //take refresh token from user
//     const refreshToken =  req.body.token;

//     //send err if token not valid
//     if(!refreshToken) return res.status(401).json("You're not authenticated.");

//     //if everything okay, create new access token & refresh token 
// })

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    // !user && res.status(404).json("user not found");
    // !validPassword && res.status(400).json("wrong password");

    if (!user) {
      res.status(404).json("User Not Found");
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        res.status(400).json("Wrong Email or Password Entered");
      else {
        const accessToken = jwt.sign(
          { _id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
        //   { expiresIn: "15m"}
        );
        user.tokens = user.tokens.concat({token: accessToken})
        await user.save();

        res.cookie("jwToken", accessToken,{
            expires:new Date(Date.now() + 3600000),
        });
        // const refreshToken = jwt.sign(
        //   { _id: user._id, isAdmin: user.isAdmin },
        //   process.env.REFRESH_KEY,
        // );
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};







module.exports = router;
