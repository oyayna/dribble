import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const Company = () => {
  const [showMenu, setShowMenu] = useState(false);
  const MenuRef = useRef(null);

  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (MenuRef.current && !MenuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <Navbar />
      <div id="wrap">
        <div id="wrap-inner">
          <div id="content">
            <div className="constrained-content-alt">
              <div className="group">
                <div className="slat-header user">
                  <img
                    src="./assets/images/53561cdb4acfea5898d87c2a46d6dae6.jpg"
                    alt=""
                  />
                  <div className="slat-details">
                    <h1>
                      <a href="">
                        <span>Ak Adrago</span>
                        <span className="sep">/</span>
                        <span> General </span>
                      </a>
                    </h1>
                    <h2>Update your username and manage your account</h2>
                  </div>
                </div>
              </div>
              <div className="secondary">
                <ul className="vertical-sidenav">
                  <li>
                    <Link to="/general">General</Link>
                  </li>
                  <li>
                    <Link to="/edit-profile">Edit Profile</Link>
                  </li>
                  <li>
                    <Link to="/edit-password">Password</Link>
                  </li>
                  <li>
                    <Link to="/social-profiles">Social Profiles</Link>
                  </li>
                  <li className="active">
                    <Link to="/edit-company">Company</Link>
                  </li>
                  <li>
                    <Link to="/sessions">Sessions</Link>
                  </li>
                  <li>
                    <Link to="/export-data">Data Export</Link>
                  </li>
                  <li className="separator"></li>
                  <li className="warning">
                    <Link to="">Delete Account</Link>
                  </li>
                </ul>
                <div className="outline-style-dropdown" ref={MenuRef}>
                  <span className="btn-dropdown-link" onClick={handleClickMenu}>
                    <span>Choose one</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="btn-dropdown"
                    >
                      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </span>
                  {showMenu && (
                    <div className="Menuv2">
                      <ul>
                        <li>
                          <Link to="/general">
                            <span className="btn-dropdown-item"> General </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to="/edit-profile">
                            <span className="btn-dropdown-item">
                              {" "}
                              Edit Profile{" "}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to="/edit-password">
                            <span className="btn-dropdown-item">
                              {" "}
                              Password{" "}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to="/social-profiles">
                            <span className="btn-dropdown-item">
                              {" "}
                              Social Profiles{" "}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li className="active">
                          <Link to="/edit-company">
                            <span className="btn-dropdown-item"> Company </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to="/sessions">
                            <span className="btn-dropdown-item">
                              {" "}
                              Sessions{" "}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to="/export-data">
                            <span className="btn-dropdown-item">
                              {" "}
                              Data Export{" "}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div id="main">
                <form action="">
                  <div className="form-field">
                    <label htmlFor="">Company Name </label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="company-logo form-field">
                    <label htmlFor="">Company Logo </label>
                    <button className="btn2" type="button">
                      Choose Image
                    </button>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Company URL </label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-btns">
                    <input
                      id="Save-Profile"
                      styl="height: 45px"
                      style={{ height: "45px" }}
                      type="submit"
                      value="Save Company"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
