import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/CartSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setProgress } from "../../slices/loadingBarSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate, dispatch) {
  return async (dispatch) => {
    dispatch(setProgress(40));
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    dispatch(setProgress(60));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      dispatch(setProgress(100));

      if (!response.data.success) {
        throw new Error("Request failed : ", response.data.message);
      }
      dispatch(setProgress(60));

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error?.response?.data?.message);
      dispatch(setProgress(100));
    }
    dispatch(setProgress(100));
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
  dispatch
) {
  dispatch(setProgress(40));
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    });

    // console.log("SIGNUP API RESPONSE : ", response)
    dispatch(setProgress(60));
    if (!response.data.success) {
      throw new Error("Request failed ", response.data.message);
    }
    dispatch(setProgress(60));
    toast.success("Signup Successful");
    navigate("/login");
  } catch (error) {
    dispatch(setProgress(100));
    console.log("SIGNUP API ERROR : ", error);
    toast.error("Signup Failed");
    navigate("/signup");
  }

  dispatch(setLoading(false));
  toast.dismiss(toastId);
  dispatch(setProgress(100));
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setProgress(40));
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      dispatch(setProgress(60));
      // console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProgress(100));
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      dispatch(setProgress(100));
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    dispatch(setProgress(100));
  };
}

export const getPasswordResetToken = async (email, setEmailSent, dispatch) => {
  dispatch(setProgress(40));
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", RESETPASSTOKEN_API, {
      email,
    });

    console.log("RESETPASSTOKEN RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setProgress(60));
    toast.success("Reset Email Sent");
    setEmailSent(true);
  } catch (error) {
    console.log("RESETPASSTOKEN ERROR............", error);
    toast.error("Failed To Send Reset Email");
  }
  toast.dismiss(toastId);
  dispatch(setLoading(false));
  dispatch(setProgress(100));
};

export const resetPassword = async (
  password,
  confirmPassword,
  token,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  dispatch(setProgress(40));
  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      password,
      confirmPassword,
      token,
    });

    console.log("RESETPASSWORD RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    dispatch(setProgress(60));
    toast.success("Password Reset Successfully");
    navigate("../login");
  } catch (error) {
    console.log("RESETPASSWORD ERROR............", error);
    toast.error("Failed To Reset Password");
  }
  toast.dismiss(toastId);
  dispatch(setProgress(100));
  dispatch(setLoading(false));
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    dispatch(setProgress(100));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function forgotPassword(email, setEmailSent) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    dispatch(setProgress(40));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("FORGOTPASSWORD RESPONSE............", response);
      dispatch(setProgress(60));
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("FORGOTPASSWORD ERROR............", error);
    }
    // toast.dismiss(toastId)
    dispatch(setLoading(false));
    dispatch(setProgress(100));
  };
}
