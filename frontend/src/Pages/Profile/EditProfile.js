import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const EditProfile = () => {
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
                  <li className="active">
                    <Link to="/edit-profile">Edit Profile</Link>
                  </li>
                  <li>
                    <Link to="/edit-password">Password</Link>
                  </li>
                  <li>
                    <Link to="/social-profiles">Social Profiles</Link>
                  </li>
                  <li>
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
                        <li className="active">
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
                        <li>
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
                <div id="avatar-preview">
                  <img
                    src="./assets/images/53561cdb4acfea5898d87c2a46d6dae6.jpg"
                    alt=""
                  />
                  <button className="Upload-new-picture btn2">
                    Upload new picture
                  </button>
                  <form action="">
                    <input type="submit" value="Delete" />
                  </form>
                  <form action="">
                    <div className="upload">
                      <input type="file" />
                      <p className="info">JPG, GIF or PNG. Max size of 800K</p>
                      <input type="submit" value="Upload Now" />
                    </div>
                  </form>
                </div>
                <form action="">
                  <div className="form-field">
                    <label htmlFor="">
                      Name <span className="label">*</span>
                    </label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                    <p className="message">
                      We’re big on real names around here, so people know who’s
                      who.
                    </p>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Location</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <div className="profile_bio">
                      <label htmlFor="">Bio</label>
                      <span id="charCount" className="character-counter">
                        1024
                      </span>
                    </div>
                    <textarea
                      style={{ borderWidth: "2px" }}
                      id="myTextarea"
                      maxLength="1024"
                    ></textarea>
                    <p className="message">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                  <div className="other-fields" style={{ marginTop: "50px" }}>
                    <h3>Online Presence</h3>
                    <div className="form-field">
                      <label htmlFor="">Personal website</label>
                      <input style={{ borderWidth: "2px" }} type="text" />
                      <p className="message">
                        Your home page, blog, or company site.
                      </p>
                    </div>
                    <div>
                      <div className="form-field">
                        <label htmlFor="">Portfolio URL </label>
                        <input style={{ borderWidth: "2px" }} type="text" />
                        <p className="message">
                          Only shared with potential employers.
                        </p>
                      </div>
                      <div className="form-field">
                        <label htmlFor="">Portfolio password</label>
                        <input style={{ borderWidth: "2px" }} type="text" />
                        <p className="message">Only if needed.</p>
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor="">Calendly URL </label>
                      <input style={{ borderWidth: "2px" }} type="text" />
                      <p className="message">
                        Will only be used if you set yourself as available for
                        work.
                      </p>
                    </div>
                  </div>
                  <div className="form-btns">
                    <input
                      id="Save-Profile"
                      style={{ height: "40px" }}
                      type="submit"
                      value="Save Profile"
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

export default EditProfile;
