import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const SocialProfiles = () => {
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
                  <li className="active">
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
                        <li className="active">
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
                <form action="">
                  <div className="form-field">
                    <label htmlFor="">Twitter</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Facebook</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field google-connection">
                    <h4>Google</h4>
                    <div style={{ marginTop: "10px" }} className="connection">
                      <div style={{ marginBottom: "12px" }}>
                        <a href="" className="auth-google btn2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            role="img"
                            class="icon "
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
                              fill="#4285F4"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                              fill="#34A853"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                              fill="#FBBC05"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                              fill="#EA4335"
                            ></path>
                          </svg>
                          Connect to Google
                        </a>
                        {/* <span className="auth-google">
                          Google
                          <a href="">
                            <img
                              src="./assets/SVG/icon-x-939a1da43f3bc3c683bf4c9d67097a519ca8c450f9c652c68078d.gif"
                              alt=""
                            />
                          </a>
                        </span> */}
                      </div>
                      <p className="message">
                        One-click sign in only (not shown on profile)
                      </p>
                    </div>
                  </div>
                  <div className="form-field figma-connection">
                    <h4>Figma</h4>
                    <div style={{ marginTop: "10px" }} className="connection">
                      <a href="" className="auth-figma btn2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="13"
                            viewBox="0 0 12 17"
                            width="13"
                            role="img"
                            className="icon"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="#fff"
                              strokeWidth="1.5"
                              transform="translate(1 1)"
                            >
                              <path d="m10.1298701 2.5c0 1.38071429-1.11928568 2.5-2.49999997 2.5h-2.56493507v-4.99999351h2.56493507c1.38071429 0 2.49999997 1.11928572 2.49999997 2.49999351z"></path>
                              <path d="m0 2.5c0 1.38071429 1.11928571 2.5 2.5 2.5h2.56493506v-4.99999351h-2.56493506c-1.38071429 0-2.5 1.11928572-2.5 2.49999351z"></path>
                              <path d="m0 7.50006494c0 1.38071428 1.11928571 2.49999996 2.5 2.49999996h2.56493506v-4.99999347h-2.56493506c-1.38071429 0-2.5 1.11927922-2.5 2.49999351z"></path>
                              <path d="m0 12.5c0 1.3807143 1.13541558 2.5 2.51612987 2.5 1.39864286 0 2.54880519-1.1338312 2.54880519-2.5324675v-2.4675325h-2.56493506c-1.38071429 0-2.5 1.1192857-2.5 2.5z"></path>
                              <path d="m5.06493506 7.50006494c0 1.38071428 1.11928572 2.49999996 2.5 2.49999996h.06493507c1.38071429 0 2.49999997-1.11928568 2.49999997-2.49999996 0-1.38071429-1.11928568-2.49999351-2.49999997-2.49999351h-.06493507c-1.38071428 0-2.5 1.11927922-2.5 2.49999351z"></path>
                            </g>
                          </svg>
                        </span>
                        <span> Connect to Figma</span>
                      </a>
                      <p className="message">
                        Not shown on profile. Learn how to
                        <a href="">Share from Figma</a>.
                      </p>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Instagram</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="">GitHub</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Creative Market </label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="">CodePen</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                    <div className="form-field check-wrap">
                      <div className="checkbox-radio-label">
                        <input className="CodePen" type="checkbox" />
                        <span
                          style={{
                            cursor: "default",
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontOpticalSizing: "auto",
                            fontWeight: "500",
                            fontStyle: "normal",
                          }}
                        >
                          This is a team account
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Medium</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                    <div className="form-field check-wrap">
                      <div className="checkbox-radio-label">
                        <input className="CodePen" type="checkbox" />
                        <span
                          style={{
                            cursor: "default",
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontOpticalSizing: "auto",
                            fontWeight: "500",
                            fontStyle: "normal",
                          }}
                        >
                          This is a publication
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Behance</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="">LinkedIn</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                    <div className="form-field check-wrap">
                      <div className="checkbox-radio-label">
                        <input className="CodePen" type="checkbox" />
                        <span
                          style={{
                            cursor: "default",
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontOpticalSizing: "auto",
                            fontWeight: "500",
                            fontStyle: "normal",
                          }}
                        >
                          This is a company account
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="">Vimeo</label>
                    <input style={{ borderWidth: "2px" }} type="text" />
                  </div>
                  <div className="form-btns">
                    <input
                      id="Save-Profile"
                      style={{ height: "45px" }}
                      type="submit"
                      value="Update Social Profiles"
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

export default SocialProfiles;
