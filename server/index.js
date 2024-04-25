const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/databse");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const { contactUs } = require("./controllers/ContactUs");

const PORT = process.env.PORT || 4000;

// connect to db
database.connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://echo-an.netlify.app/",
    credentials: true,
    maxAge: 14400,
}));                            
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

// connect to cloudinary
cloudinaryConnect();

// routes
app.use("/api/v1/contact", contactUs);
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your server is up and running...",
    });
});

// activate server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})