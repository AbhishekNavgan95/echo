import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Error from "./pages/Error";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import OpenRoute from "./components/cors/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import EnrolledCourses from "./pages/EnrolledCourses";

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900">
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<OpenRoute><SignUp /></OpenRoute>} />
          <Route path="login" element={<OpenRoute><LogIn /></OpenRoute>} />
          <Route path="reset-password" element={<OpenRoute><ResetPassword /></OpenRoute>} />
          <Route path="update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
          <Route path="verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;