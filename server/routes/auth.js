const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/middleware");
const{ Jwt_secret}= require("../middleware/middleware")

// const verifytoken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).send({ error: "No token provided" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({ error: "Invalid token" });
//     }
//     req.user = decoded; // Save the decoded token data (in this case, the userId) to the request object for use in protected routes.
//     next();
//   });
// };

router.post("/create", async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).send({ error: "Passwords do not match" });
    }

    // console.log(req.body.password);
    const { username,email, password } = req.body;

    // Validate user input
    // if (!(username && email && password )) {
    //   return res.status(400).send({ error: "All input fields are required" });
    // }

    // Check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ error: "User has already registered" });
    }

    // Hash the password
    const encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await User.create({
      username,
      email,
      password: encryptedUserPassword,
    });

    return res.send({ success: "Registration successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});
router.post("/create-session",async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email}); 
    // console.log(email);
    if(user && (await bcrypt.compare(password,user.password))){
      console.log(Jwt_secret);
      const token= jwt.sign({_id:user.id},Jwt_secret,{
        expiresIn:"30d"
      })
      console.log(token);
      return res.send({success:token});
    }
    else{
      return res.send({error:"error u have to first login"});
    }

  }
  catch(err){
    return res.send({error:"Internal server error"});
  }
})
module.exports = router;

