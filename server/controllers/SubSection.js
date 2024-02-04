const SubSection = require("../models/Subsection");
const Section = require("../models/Section");
const {uploadImageTocloudinary} = require("../utils/imageUploader");
require("dotenv").config();

// create Subsection
exports.createSubSection = async (req, res) => {
  try {
    // fetch data and video
    const { sectionId, title, timeDuration, description } = req.body;

    const video = req.files.videoFile;

    console.log(
      "printing data: ",
      sectionId,
      title,
      timeDuration,
      description,
      video
    );

    // validate data
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "Alll fields are required",
      });
    }

    // check if section exists
    const ifsection = await Section.findById(sectionId);
    if (!ifsection) {
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    }
    
    // upload video to cloud
    const uploadDetils = await uploadImageTocloudinary(
      video,
      process.env.FOLDER_NAME
    );
      
    console.log("hello!!");

    // create subsection and enter in db along with url recieved from cloud
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetils.secure_url,
    });

    // update subsection into Section schema
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    // res
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedSection,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the section",
    });
  }
};

// #TODO create update subsection and delete subsection
