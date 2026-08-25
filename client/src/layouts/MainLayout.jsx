import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../styles/layout.css";


function MainLayout() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);


  const toggleSidebar = () => {

    setIsSidebarOpen(
      (currentValue) => !currentValue
    );

  };


  const closeSidebar = () => {

    setIsSidebarOpen(false);

  };


  return (

    <div className="layout">


      <Navbar
        onMenuClick={toggleSidebar}
      />


      <div className="content">


        {/* MOBILE OVERLAY */}

        {isSidebarOpen && (

          <div
            className="sidebar-overlay"
            onClick={closeSidebar}
          />

        )}


        {/* SIDEBAR */}

        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />


        {/* PAGE CONTENT */}

        <main className="main-content">

          <Outlet />

        </main>


      </div>

    </div>

  );

}


export default MainLayout;