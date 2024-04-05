import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/cors/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="bg-yellow-25 text-4xl">Loading...</div>;
  }

  return (
    <div
      className="bg-richblack-900 flex flex-col">
      <div className="w-full bg-richblack-800">
        <Sidebar />
      </div>
      <div className="text-richblack-5 h-full w-full  mx-auto  max-w-maxContent">
        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
