const { userQueryEmailTamplate } = require("../mail/tamplates/userQueryEmail");
const mailSender = require("../utils/mailsender")

exports.contactUs = async (req, res) => {
    console.log("here")
    try {
      const { 
        countryCode, 
        email, 
        firstName, 
        lastName, 
        message, 
        phone 
    } = req.body;
  
      if (
        !countryCode ||
        !email ||
        !firstName ||
        !lastName ||
        !message ||
        !phone
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const data = {
        firstName,
        lastName,
        message,
        phone: countryCode + phone,
        email
      }    
      console.log("here 2")
  
      const emailTamplate = userQueryEmailTamplate(data);
      console.log("PROCESS.ENV.ADMIN_EMAIL : " , process.env.ADMIN_EMAIL)
      const emailRes = await mailSender(process.env.ADMIN_EMAIL, "New User Query", emailTamplate);
  
      console.log("here 3 ", emailRes)

      if(emailRes) {
        res.status(200).json({
          success:true, 
          message: "Query Submitted Successfully"
        })
      }
  
    } catch (e) {
      res.status(500).json({
        success:false, 
        message: "Something went wrong while submitting the query"
      })
    }
  };
  