import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="bg-yellow-25 text-4xl">Loading...</div>;
  }

  return (
    <div className="bg-richblack-900 flex min-h-[calc(100vh-5rem)]">
      <Sidebar />
      <div className="h-full">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
