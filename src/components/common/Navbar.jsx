import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import ProfileDropdown from "../../components/cors/Auth/ProfileDropDown";
import CtaButton from "./CtaButton";
import { categories } from "../../services/apis";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { apiConnector } from "../../services/apiconnector";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Modal from "./Modal";
import { logout } from "../../services/operations/authAPI";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [subLinks, setSubLinks] = useState([]);
  const [navOpen, setNavOpen] = useState(false); 1
  const [subNav, setSubNav] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

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
    <>
      <div className="border-b border-richblack-600 bg-richblack-900 py-5 relative z-[10]">
        <div className="flex max-w-maxContent mx-auto justify-between px-5 items-center relative z-[10]">
          {/* logo */}

          <Link to={"/"} className="">
            <img className="max-w-[5rem]" src={logo} alt="" />
          </Link>

          {/* nav links*/}
          <div className="md:flex font-semibold text-lg items-center justify-center gap-5 hidden">
            {NavbarLinks.map((link, index) => {
              return link.title === "Catalog" ? (
                <button
                  className="text-richblack-25 group hover:cursor-pointer relative flex items-center gap-2"
                  key={index}
                >
                  <p>{link.title}</p>
                  <MdOutlineKeyboardArrowDown />
                  <div 
                    className="bg-richblack-5 text-richblack-900 absolute min-w-[250px] rounded-xl top-[120%] left-[100%] z-[5] translate-x-[-70%] translate-y-[0] scale-y-0 origin-top group-hover:scale-y-100 group-focus:scale-y-100 transition-all duration-100 group-hover:opacity-100 flex flex-col items-center"
                  >
                    {
                      subLinks?.length <= 0
                        ? <div>No categories found</div>
                        : subLinks.map((category, index) => (
                          <NavLink
                            to={`/catalog/${category.name}`}
                            className="relative z-[5] rounded-xl transition-all group duration-200 hover:bg-richblack-100 overflow-hidden px-5 py-3 w-full text-center"
                            key={index}
                          >
                            <p className="text-nowrap">{category.name}</p>
                          </NavLink>
                        ))}
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
          <div className="md:flex items-center gap-3 text-richblack-25 text-xl hidden">
            {token === null && (
              <CtaButton active="true" linkTo={"/login"}>
                Log in
              </CtaButton>
            )}
            {token === null && (
              <CtaButton active="false" linkTo={"/signup"}>
                Sign up
              </CtaButton>
            )}
            {token !== null && <ProfileDropdown />}
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <FiShoppingBag />
                {totalItems > 0 && <span className="absolute top-[50%] right-[-50%] text-xs font-bold bg-yellow-100 rounded-full px-2 text-richblack-900">{totalItems}</span>}
              </Link>
            )}
          </div>

          {/* nav button */}
          <div className="md:hidden cursor-pointer text-richblack-5 text-3xl" onClick={() => { setNavOpen(!navOpen); setSubNav(false) }}>
            {
              !navOpen
                ? <HiOutlineMenuAlt3 />
                : <IoClose />
            }
          </div>
        </div>

        {/* mobile navbar */}
        <div className={`absolute z-[7] w-full md:hidden top-[100%]  ${navOpen ? "translate-y-0" : "translate-y-[-150%]"} transition-all duration-300 border border-richblack-600 bg-opec flex flex-col gap-5 items-center justify-center py-20 text-xl`}>
          {/* <div className=""> */}
          {NavbarLinks.map((link, index) => {
            return link.title === "Catalog" ? (
              <button
                className="text-richblack-5 w-full relative group hover:cursor-pointer flex flex-col items-center gap-2"
                key={index}
                onClick={() => setSubNav(!subNav)}
              >
                <div className="flex items-center gap-1 group">
                  <p>{link.title}</p>
                  <MdOutlineKeyboardArrowDown className={`${subNav ? "rotate-[180deg] transition-rotate duration-300" : "rotate-[0deg] transition-rotate duration-300"}`} />
                </div>
                <div className={
                  `absolute top-[100%] ${subNav ? "scale-y-100 visible" : "invisible scale-y-0"} transition-scale duration-100 origin-top w-10/12 px-3 flex flex-col bg-richblack-800 rounded-lg py-2 border border-richblack-600`
                }
                >
                  {
                    subLinks?.length <= 0 ?
                      <div>No categories found</div>
                      :
                      subLinks?.map((category, index) => (
                        <NavLink
                          to={`/catalog/${category.name}`}
                          className="py-2 rounded-lg hover:bg-richblack-100 hover:text-richblack-900"
                          key={index}
                          onClick={() => { setNavOpen(!navOpen); setSubNav(false) }}
                        >
                          <p className="">{category.name}</p>
                        </NavLink>
                      ))}
                </div>
              </button>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-yellow-25" : "text-richblack-25"
                }
                key={index}
                to={link?.path}
                onClick={() => setNavOpen(false)}
              >
                <p>{link.title}</p>
              </NavLink>
            );
          })}
          <div className="flex items-center flex-col gap-y-5">
            {
              token &&
              <NavLink
                active='true'
                to={"/dashboard/my-profile"}
                onClick={() => {
                  setNavOpen(!navOpen);
                }}
                className={({ isActive }) =>
                  isActive ? "text-yellow-25" : "text-richblack-25"
                }
              >
                Dashboard
              </NavLink>
            }
            {
              token &&
              <button
                onClick={() => setConfirmationModal({
                  heading: "Are you sure?",
                  subHeading: "You'll be logged out",
                  btn1Text: "Log out",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })}
                className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-[#721414] hover:bg-[#511515] text-richblack-5 focus:bg-[#511515] active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300">Log out</button>
            }
            <div className="flex gap-5">
              {token === null && (
                <button onClick={() => {
                  setNavOpen(!navOpen)
                }}>
                  <CtaButton active="true" linkTo={"/login"}>
                    Log in
                  </CtaButton>
                </button>
              )}
              {token === null && (
                <button onClick={() => {
                  setNavOpen(!navOpen)
                }}>
                  <CtaButton active={false} linkTo={"/signup"}>
                    Sign up
                  </CtaButton>
                </button>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      {
        confirmationModal && <Modal modalData={confirmationModal} />
      }
    </>
  );
};

export default Navbar;
