const { instance } = require("../config/razorPay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const {
  courseEnrollmentEmail,
} = require("../mail/tamplates/courseEntrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the paymentLink and initiate razorpay order
exports.capturePayment = async (req, res) => {
  // get course id and user id
  const { course_Id } = req.body;
  const userId = req.user.id;

  // validation of course id, course Details, if user already have that course
  // if course id is invalid
  if (!course_Id) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid course ID",
    });
  }

  let courseDetail;
  try {
    courseDetail = await Course.findById(course_Id);

    // if course with specified id does not exist
    if (!courseDetail) {
      return res.status(400).json({
        success: false,
        message: "Could not find the course",
      });
    }

    // check if user alreaady have this course
    // convert user id from string to user id
    const uid = new mongoose.Types.ObjectId(userId);

    if (courseDetail.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled in the course",
      });
    }
  } catch (e) {
    console.log("Error while perchasing the course ", e);
    return res.status(500).json({
      success: false,
      message: e?.message || e,
    });
  }

  // create order
  const amount = courseDetail.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now().toString()),
    notes: {
      courseId: course_Id,
      userId,
    },
  };

  try {
    // initiate payment
    const paymentResponse = await instance.orders.create(options);
    console.log("payment response");

    return res.status(200).json({
      success: true,
      courseName: courseDetail.courseTitle,
      courseDescription: courseDetail.courseDescription,
      thumbnail: courseDetail.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (e) {
    console.log("Error while initiating order", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating order!",
    });
  }
};

// verify Signature of Razorpay and server
exports.verifySignature = async (req, res) => {
  const webHookSecret = "abhishek";

  const signature = req.headers("x-razorpay-signature");

  const shasum = crypto.createHmac("sha256", webHookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // entroll student in the course
      const enrolledCourse = Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        {
          new: true,
        }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found!",
        });
      }

      console.log("EnrolledCourse: ", enrolledCourse);

      // find the student and asign course to student enrolled courses

      const enrolledStudent = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $push: {
            courses: courseId,
          },
        },
        {
          new: true,
        }
      );

      console.log("Enrolled student : ", enrolledStudent);

      // send success mail to user
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from Eco",
        "You are now enrolled in the Eco's new course"
      );

      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (e) {
      console.log("Something went wrong while verifying the signature", e);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while verifying the signature",
      });
    }
  }

  return res.status(400).json({
    success: false,
    message: "signature didn't matched",
  });
};
