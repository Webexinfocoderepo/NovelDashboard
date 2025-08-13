const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
   try {
       const { userName, password } = req.body;


       if (!userName || !password) {
           return res.status(400).json({ message: "Username and password are required" });
       }


       const admin = await Admin.findOne({ userName });
       if (!admin) {
           return res.status(401).json({ message: "Admin not found" });
       }


       const isMatch = await bcrypt.compare(password, admin.password);
       if (!isMatch) {
           return res.status(401).json({ message: "Invalid Password" });
       }
       res.status(200).json({
           message: "Login successful",
           response:admin
       });
   } catch (error) {
       res.status(500).json({ message: "Server error", error: error.message });
   }
});


module.exports = router;
