import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./sidebar/SidebarLink";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import Modal from "../../common/Modal";

const Sidebar = () => {
  const { user, loading: userLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    isOpen: false,
  });
  const { isOpen } = useSelector(state => state.Dashboard);

  if (userLoading || authLoading) {
    return <div className="bg-yellow-25 text-4xl">Loading...</div>;
  }

  return (
    <div className={isOpen ? "w-[250px] py-10 min-h-[calc(100vh-4rem)] border-r border-richblack-600 text-white bg-richblack-800 absolute translate-x-[0%] transition-all duration-300 z-[4] md:static" : "w-[250px] py-10 min-h-[calc(100vh-4rem)] border-r border-richblack-600 text-white bg-richblack-800 absolute translate-x-[-100%] md:translate-x-0 transition-all duration-300 md:static"}>
      <div className="flex flex-col ">
        {sidebarLinks.map((link, index) => {
          if (link.type && user?.accountType === link.type || link.type === undefined) {
            return <SidebarLink key={index} link={link} />;
          }
          if (link.path === "settings") {
            return <SidebarLink key={index} link={link} />;
          }
        })}
        <div className="flex flex-col gap-1">
          <button
            onClick={() =>
              setModal({
                heading: "Are you sure?",
                subHeading: "You'll be logged out",
                btn1Text: "Log out",
                btn2Text: "Cancel",
                isOpen: true,
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setModal({ isOpen: false }),
              })
            }
            className=" flex gap-3 text-lg items-center px-4 text-white w-full py-2 bg-[#721414] "
          >
            <GrLogout />
            Logout
          </button>
        </div>
      </div>
      {modal.isOpen === true ? <Modal modalData={modal} /> : null}
    </div>
  );
};

export default Sidebar;
