import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

export const updatePfp = async (token, file) => {
  const toastId = toast.loading("Uploading...");
  try {
    const formData = new FormData();
    console.log("formData: ", formData);
    formData.append("thumbnail", file);

    const response = await apiConnector(
      "PUT",
      settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("upload image response : ", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile picture updated successfully!");

    const imageUrl = response.userDetails.image;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        image: imageUrl,
      })
    );
  } catch (e) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", e);
    toast.dismiss(toastId);
  }
  toast.dismiss(toastId);
};

export const updateProfile = async (token, formData) => {
  const toastId = toast.loading("Loading...");
  try {
    const reponse = await apiConnector(
      "PUT",
      settingsEndpoints.UPDATE_PROFILE_API,
      formData,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //Add this line
      }
    );

    if (!reponse.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("your details updated successfully");
    toast.dismiss(toastId);
  } catch (e) {
    console.log("something went wrong");
    setLoading(false);
    toast.dismiss(toastId);
  }
};

export const deleteAccount = async (token, dispatch, navigate) => {
  const toastId = toast.loading();

  try {
    const response = await apiConnector(
      "DELETE",
      settingsEndpoints.DELETE_PROFILE_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.dismiss(toastId);
    toast.success("Account Deleted Successfully");
    navigate("/");
  } catch (e) {
    console.log("error while deleting the account", e);
    toast.dismiss(toastId);
  }
};

export const updatePassword = async (token, formData) => {
  const toastid = toast.loading("Loading...");
  try {
    const reponse = await apiConnector(
      "POST",
      settingsEndpoints.CHANGE_PASSWORD_API,
      formData,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //Add this line
      }
    );

    if (!reponse.data.success) {
      throw new Error(response?.data?.message);
    }

    console.log("Password update API response: ", reponse?.data?.message);
    toast.dismiss(toastid);
    toast.success("your Password has been is updated successfully");
  } catch (e) {
    console.log("something went wrong : ", e);
    toast.error(e?.response?.data?.message);
    toast.dismiss(toastid);
  }
};
