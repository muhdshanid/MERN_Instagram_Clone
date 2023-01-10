import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const MainLayout = () => {
  return (
    <div className="flex bg-gray-100">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
