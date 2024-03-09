import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/CartSlice"
import courseReducer from "../slices/CourseSlice"
import DashboardReducer from "../slices/DashboardSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course : courseReducer,
    Dashboard: DashboardReducer
})

export default rootReducer;