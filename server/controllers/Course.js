const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const uploadImageTocloudinary = require("../utils/imageUploader");

// create Course
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag,
    } = req.body;

    // fetch thumnail
    const thumbnail = req.files?.thumbnail;

    console.log(
      "printing all data",
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      thumbnail
    );

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    // get instructor details for adding in course collection
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("instructor Details ", instructorDetails);

    // if instructor does not exist
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // check given tag is valid or not
    const CategoryDetails = await Category.findOne({ name: category });

    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "tag details not found",
      });
    }

    // upload file to cloud
    const thumbnailImage =
      await uploadImageTocloudinary.uploadImageTocloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );

    // create new entry for course
    const newCourse = await Course.create({
      courseTitle: courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: CategoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      tag: tag,
    });

    // add new course to the user schema of instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    // update the Tag schema #TODO
    await Category.findByIdAndUpdate(
      { _id: CategoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // res
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (e) {
    console.log("error occurred while creating new course ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating new course",
    });
  }
};

// get All courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseTitle: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate({
        path: "instructor",
        select: "firstName lastName email image",
        populate: {
          select: "contactNumber",
          path: "additionalDetails",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "data for all courses is fetched successfull",
      data: allCourses,
    });
  } catch (e) {
    console.log("error occurred while getting all courses ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all courses",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    // get id
    const { courseId } = req.body;

    // find course details
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "firstName lastName email image",
        populate: {
          select: "contactNumber",
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log("course details : ", courseDetails);

    // validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Could not find the course with the course id " + courseId,
      });
    }

    // res
    return res.status(200).json({
      success: true,
      message: "Course found",
      data: courseDetails,
    });
  } catch (e) {
    console.log("Something went wrong while getting all courses ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting all courses",
    });
  }
};
