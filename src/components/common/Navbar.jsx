import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import ProfileDropDown from "../../components/cors/Auth/ProfileDropDown";
import CtaButton from "./CtaButton";
import { categories } from "../../services/apis";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { apiConnector } from "../../services/apiConnector";
import { IoIosMenu } from "react-icons/io";
import { toggleDashboard } from "../../slices/DashboardSlice";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("result", result?.data?.data);
      setSubLinks(result?.data?.data);
    } catch (e) {
      console.log("could not fetch categories : ", e);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="border-b border-richblack-600 bg-richblack-900 py-5">
      <div className="flex max-w-maxContent mx-auto justify-between px-3 items-center">
        {/* logo */}
        <div className="flex items-center gap-3">

          {
            !location.pathname.includes("dashboard") ?
              null : <button
                className="text-richblack-5 text-2xl md:hidden"
                onClick={() => dispatch(toggleDashboard())}>
                <IoIosMenu />
              </button>
          }


          <Link to={"/"} className="">
             <img className="max-w-[5rem]" src={logo} alt="" />
          </Link>
        </div>

        {/* nav links*/}
        <div className="flex font-semibold text-lg items-center justify-center gap-5">
          {NavbarLinks.map((link, index) => {
            return link.title === "Catalog" ? (
              <button
                className="text-richblack-25 group hover:cursor-pointer relative flex items-center gap-2"
                key={index}
              >
                <p>{link.title}</p>
                <MdOutlineKeyboardArrowDown />
                <div className="bg-richblack-25 text-richblack-900 p-2 absolute min-w-[250px] rounded-xl top-[10%] left-[50%] z-[5] translate-x-[-50%] translate-y-10 group-hover:scale-y-100 group-focus:scale-y-100 focus:scale:y-100  transition-all duration-300 hover:flex flex-col scale-y-0 delay-100 origin-top flex items-start">
                  {subLinks.map((category, index) => (
                    <NavLink
                      to={`/catalog/${category.name}`}
                      className="relative z-[5] rounded-xl transition-all group duration-200 hover:bg-richblack-100 overflow-hidden px-5 py-3 w-full"
                      key={index}
                    >
                      <p className="">{category.name}</p>
                    </NavLink>
                  ))}
                  {/* <div className="w-[50px] h-[50px] bg-richblack-25 absolute -top-1 left-[50%] translate-x-[-50%] z-[3] rotate-[45deg] "></div> */}
                </div>
              </button>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-yellow-25" : "text-richblack-25"
                }
                key={index}
                to={link?.path}
              >
                <p>{link.title}</p>
              </NavLink>
            );
          })}
        </div>

        {/* Login / signup / dashboard */}
        <div className="flex items-center gap-5">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FiShoppingBag />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <CtaButton active={true} linkTo={"/login"}>
              Log in
            </CtaButton>
          )}
          {token === null && (
            <CtaButton active={false} linkTo={"/signup"}>
              Sign up
            </CtaButton>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
