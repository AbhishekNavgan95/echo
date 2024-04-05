import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";

const SidebarLink = ({ link }) => {
  const Icon = Icons[link.icon];
  const dispatch = useDispatch();

  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-yellow-100 px-4 md:px-0 md:mx-4 border-b bg-yellow-800 md:bg-transparent border-yellow-100 py-2 flex transition-all duration-200"
          : "text-richblack-5 px-4 md:px-0 md:mx-4 border-b border-transparent flex py-2 transition-all duration-200 hover:text-yellow-100"
      }
      to={link.path}
    >
      <div className="flex items-center gap-3 text-2xl md:text-lg ">
        <Icon className="text-xl" />
        <span className="hidden lg:block">
        {link.name}
        </span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
