import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar (Only show on desktop) */}
      {!isMobile && (
        <div
          style={{
            width: collapsed ? "80px" : "250px",
            transition: "width 0.3s ease",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#fff",
            borderRight: "1px solid #dee2e6",
          }}
        >
          <Sidebar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} />
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          height: "100vh",
          transition: "all 0.3s ease",
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Mobile Sidebar Button */}
        {isMobile && (
          <div className="d-inline-block d-lg-none ">
            <button className="btn btn-primary" onClick={handleToggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            {collapsed && (
              <div className="position-absolute top-0 start-0 bg-white shadow" style={{ width: "250px", height: "100vh", zIndex: 1050, transition: '3s ' }}>
                <Sidebar collapsed={false} onToggleSidebar={handleToggleSidebar} />
              </div>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Layout;
