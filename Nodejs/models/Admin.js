const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const adminSchema = new mongoose.Schema({
   userName: { type: String, required: true},
   password: { type: String, required: true }
}, { timestamps: true });


const Admin = mongoose.model('Admin', adminSchema)


module.exports = Admin;


// module.exports = mongoose.model("Admin", adminSchema);




Admin.findOne(
   { userName: "thenovelresearch.com" }).then(adminRes => {
       if (adminRes) {
           console.log("Default admin already exist");
       }
       else {
           let createAdmin = {
            
               userName: "thenovelresearch.com",
               password: bcrypt.hashSync("Admin@1234", 12)


           };
           let saveResult = Admin(createAdmin).save()
           if (saveResult) {
               console.log("successfull created Admin")
           }
           else {
               console.log("Failed to create ADMIN! ABORTING")
               return


           }
       }


   }).catch(adminErr => {
       console.log({ errror: adminErr })
       return
   })
