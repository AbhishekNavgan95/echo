const Profile = require("../models/Profile");
const User = require("../models/User");
require("dotenv").config();
const { uploadImageTocloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    // fetch data with user id
    const { dateOfBirth , about , contactNumber, gender } = req.body;
    // console.log("Details recieved",dateOfBirth, about, contactNumber, gender);

    
    // console.log(dateOfBirth, about, gender, contactNumber)
    const id = req.user.id;
    
    // vailidate data
    // if (!contactNumber || !gender) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "contact number and gender are required",
    //   });
    // }

    //  find profile
    const userDetails = await User.findById(id);
    // console.log("userDetails : ", userDetails);
    
    const profileId = userDetails.additionalDetails;
    
    const profileDetails = await Profile.findById(profileId);
    // console.log("profileDetails : ", profileDetails);

    // update profile
    profileDetails.DOB = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    // res
    return res.status(200).json({
      success: true,
      message: "Profile has been uptated successfully",
      data: profileDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong while updating the profile!",
    });
  }
};

// delete account handler
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    
    // validation
    const userDetails = await User.findById(id);
    
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    
    // delete user profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // #TODO delete user from all enrolled courses

    // delete user
    await User.findByIdAndDelete(id);

    // res
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, User deletion failed",
    });
  }
};

// get all user details handler
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // remove account password from the res
    const user = userDetails.toObject();
    user.password = undefined;

    return res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        data: user
    })
} catch (e) {
    return res.status(500).json({
        success: false,
        message: "something went wrong while fetching user details",
    })
  }
};

// upload disaply picture
exports.updateDisplayPicture = async (req, res) => {
  try {

    // get id
    const id = req.user.id;

    // find user with that id
    const  user = await User.findById(id);
    const image = req.files?.thumbnail;
    console.log("file recieved : ", image);

    // validate user
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    
    // validate image
    if(!image) {
      return res.status(404).json({
        success: false,
        message: "image not found",
      })
    }

    // upload file to cloud
    const uploadDetails = await uploadImageTocloudinary(image, process.env.FOLDER_NAME)

    console.log("image uplaod details : ", uploadDetails);

    const userDetails = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        image: uploadDetails.secure_url
      },
      {
        new: true
      }
    )

    res.status(200).json({
      success: true,
      message: "Image uploaded to successfully",
      userDetails
    })

  } catch(e) {
    res.status(500).json({
      success: false,
      message: "something went wrong while uploading the image",
    })
  }
}