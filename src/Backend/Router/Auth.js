const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const {getToken} = require("../Utils/Helpers");
const User = require("../Model/User");


// Google OAuth login route
router.get(
    "/google",
    passport.authenticate("google", {scope: ["profile", "email"]}),
);

// Google OAuth callback route
router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect: "/login"}),
    async (req, res) => {
      try {
        // Extract user information from Google authentication
        const {email, userName} = req.user;

        // Check if the user already exists in your database
        let user = await User.findOne({email});

        // If the user doesn't exist, create a new user without requiring a password
        if (!user) {
          user = new User({email, userName});
          await user.save();
        }

        const token = await getToken(email, user);

        

        res.redirect(`http://localhost:3000/Blog?token=${token}`); // Redirect to home page or send token in response
      } catch (error) {
        console.error("Error handling Google authentication:", error);
        res.status(500).json({error: "Error handling Google authentication"});
      }
    },
);


router.post("/login", async (req, res) => {
    try {
      const {email, passWord} = req.body;
      // check if email exists
      const user = await User.findOne({email});
  
      // if user exists
      if (user) {
        const passwordChecker = await bcrypt.compare(passWord, user.passWord);
        if (passwordChecker) {
          // generate a Jwt token for authentication
          const token = await getToken(email, user);
  
          // Send success response with token
          return res.status(200).json({success: true, token});
        }
        return res.status(401).json({message: "User password does not match"});
      }
      return res.status(404).json({message: "Email not found"});
    } catch (error) {
      console.error("Error signing in to the account:", error);
      return res.status(500).json({error: "Error signing in to the account"});
    }
  });
  

module.exports = router;
