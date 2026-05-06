import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          500miles
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            {accessToken && (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex justify-content-center align-items-center"
                  to="/personal"
                >
                  <CgProfile className="me-1" />
                  Personal
                </Link>
              </li>
            )}
            <li className="nav-item">
              {!accessToken ? (
                <button
                  className="nav-link"
                  onClick={handleLogin}
                  style={{ display: "none" }}
                >
                  Login
                </button>
              ) : (
                <button className="nav-link" onClick={handleLogOut}>
                  <AiOutlineLogout className="me-1" />
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
