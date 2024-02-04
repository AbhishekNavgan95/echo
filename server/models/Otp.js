const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");

const OTPSchema = new mongoose.Schema({
    email: {
        type :String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
})

// function to send email
async function sendVarificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Varification Email from Echo", otp);
        console.log("Email sent successfully : ", mailResponse);
    }
    catch(e) {
        console.log("error occured while sending mail", e)
        throw(e)
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVarificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", OTPSchema);