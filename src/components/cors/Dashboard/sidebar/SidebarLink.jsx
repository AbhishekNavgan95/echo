import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { toggleDashboard } from "../../../../slices/DashboardSlice";

const SidebarLink = ({ link }) => {
  const Icon = Icons[link.icon];
  const dispatch = useDispatch();

  return (
    <NavLink
      onClick={() => dispatch(toggleDashboard())}
      className={({ isActive }) =>
        isActive
          ? "text-yellow-100 px-4 border-l border-yellow-100 bg-yellow-800 py-2 flex transition-all duration-200"
          : "text-white px-4 border-l border-transparent flex py-2 transition-all duration-200 "
      }
      to={link.path}
    >
      <div className="flex items-center gap-3 text-lg ">
        <Icon />
        {link.name}
      </div>
    </NavLink>
  );
};

export default SidebarLink;
