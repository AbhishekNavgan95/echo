import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";

// Authentication routes
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// routes
import OpenRoute from "./components/cors/Auth/OpenRoute";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";

// dashboard pages
import MyProfile from "./components/cors/Dashboard/MyProfile";
import Cart from "./components/cors/Dashboard/Cart";
import Settings from "./components/cors/Dashboard/Settings";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";
import AddCourse from "./components/cors/Dashboard/AddCourse";
import MyCourses from "./components/cors/Dashboard/MyCourses";
import EditCourse from "./components/cors/Dashboard/editCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ScrollToTop from "./components/common/ScrollToTop";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/cors/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/cors/Dashboard/InstructorDashboard";
import { ACCOUNT_TYPE } from "./utils/constants";
import AdminDashboard from "./components/cors/Dashboard/AdminDashboard";
import AddCategory from "./components/cors/Dashboard/AddCategory";
import { setProgress } from "./slices/loadingBarSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.profile.user);
  const location = useLocation();
  const { progress } = useSelector(state => state.loadingBar);
  const dispatch = useDispatch();

  return (
    <div className="w-screen min-h-screen bg-richblack-900">
      <LoadingBar
        color="#FFD60A"
        height={2}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      {
        !location?.pathname?.includes("view-course") &&
        <Navbar />
      }
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="catalog/:category" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          }
        />
        <Route
          path="reset-password"
          element={
            <OpenRoute>
              <ResetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="my-profile" element={<MyProfile />} />
          {user?.accountType === "Student" ? (
            <>
              <Route path="cart" element={<Cart />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
            </>
          ) : null}
          {user?.accountType === "Admin" ? (
            <>
              <Route path="add-category" element={<AddCategory />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
            </>
          ) : null}
          {user?.accountType === "Instructor" ? (
            <>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="instructor" element={<InstructorDashboard />} />
              <Route path="edit-course/:id" element={<EditCourse />} />
            </>
          ) : null}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="view-course" element={
          <PrivateRoute >
            <ViewCourse />
          </PrivateRoute>
        }>
          <>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT
              && <Route
                path=":courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            }
          </>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>

      {
        location.pathname.includes("dashboard") || location.pathname.includes("view-course") ?
          null : <Footer />
      }

    </div>
  );
}

export default App;
