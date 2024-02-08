import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="bg-yellow-25 text-4xl">Loading...</div>;
  }

  return (
    <div className="bg-richblack-900 w-full flex">
      <Sidebar />
      <div className="text-white h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
