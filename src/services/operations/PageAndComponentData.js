import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading("Loading...");
  let result = [];

  try {
    // Make API call
    const response = await apiConnector(
      "POST", 
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }, 
      null, 
      null 
    );

    // Validate result
    if (!response?.data?.success) {
      throw new Error("Could not fetch category page");
    }

    console.log("CATALOG PAGE API RESPONSE : ", response);
    result = response?.data?.data;

  } catch (e) {

    console.log("CATALOG PAGE API ERROR : ", e);
    result = e?.response?.data;
    
  }

  // toast.dismiss(toastId);
  return result;
};
