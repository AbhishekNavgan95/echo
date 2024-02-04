const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;

    // validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // add section in db
    const newSection = await Section.create({ sectionName: sectionName });

    // update course with section ObjectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        // ## nested populate homework
        path: "courseContent",
        model: "Section",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();

    // res
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message:
        "something went wrong while creating the section, unable to create section",
    });
  }
};

// update section handler
exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;

    // validate data
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // update data in db
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // res
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedSection,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message:
        "something went wrong while updating the section, unable to create section",
    });
  }
};

// dekete section handler
exports.deleteSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId } = req.body;

    // validate data
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "cannot delete section without id",
      });
    }

    // delete data in db
    await Section.findByIdAndDelete(sectionId);

    // res
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message:
        "something went wrong while deleting the section, unable to create section",
    });
  }
};
