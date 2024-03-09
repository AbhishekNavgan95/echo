import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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

function App() {
  const user = useSelector((state) => state.profile.user);
  console.log("User : ", user, "REMOVE FROM App.jsx / 24 ");
  const location = useLocation();

  return (
    <div className="w-screen min-h-screen bg-richblack-900">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
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
          {user?.accountType === "Instructor" ? (
            <>
              <Route path="add-course" element={<AddCourse />} />
            </>
          ) : null}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      
      {
        location.pathname.includes("dashboard")? 
        null  : <Footer />
      }
      
    </div>
  );
}

export default App;
