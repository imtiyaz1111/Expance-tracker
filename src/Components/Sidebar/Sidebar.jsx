import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import logo from "./../../assets/img/AuthIcon/Group.png";

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  return (
    <>
      <section className="fixed-left sidebar-wrapper">
        <div className="container">
          <div className="row">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
              <div className="sidebar-header">
                <h5 className="text-info fw-bold d-flex align-items-center justify-content-center gap-2">
                  {!collapsed && <span className="sidebar-title bg ms-2">EXPENSIO</span>}
                  <img src={logo} alt="Logo" className="sidebar-logo d-flex justify-content-center align-items-center ms-2" />
                </h5>
              </div>

              <nav className="nav flex-column flex-grow-1" style={{paddingLeft: collapsed ? "0px" : "15px",}}>
                <NavLink exact to="/dashboard" className="nav-link" activeClassName="active">
                  <i className="fas fa-home"></i>
                  {!collapsed && <span className="ms-2">Dashboard</span>}
                </NavLink>
                <NavLink to="/transactions" className="nav-link" activeClassName="active">
                  <i className="fas fa-exchange-alt"></i>
                  {!collapsed && <span className="ms-2">Transactions</span>}
                </NavLink>
                <NavLink to="/analysis" className="nav-link" activeClassName="active">
                  <i className="fas fa-chart-line"></i>
                  {!collapsed && <span className="ms-2">Analysis</span>}
                </NavLink>
                <NavLink to="/budgets" className="nav-link" activeClassName="active">
                  <i className="fas fa-wallet"></i>
                  {!collapsed && <span className="ms-2">Budgets</span>}
                </NavLink>
                <NavLink to="/expenses" className="nav-link" activeClassName="active">
                  <i className="fas fa-money-bill-wave"></i>
                  {!collapsed && <span className="ms-2">Expenses</span>}
                </NavLink>
                <NavLink to="/categories" className="nav-link" activeClassName="active">
                  <i className="fas fa-list"></i>
                  {!collapsed && <span className="ms-2">Categories</span>}
                </NavLink>

                <div className="sidebar-toggle d-flex justify-content-center my-3">
                <button
                  className="btn btn-light btn-sm rounded-circle"
                  onClick={onToggleSidebar}
                >
                  <i className={`fas ${collapsed ? "fa-arrow-right" : "fa-arrow-left"}`}></i>
                </button>
              </div>
              </nav>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
