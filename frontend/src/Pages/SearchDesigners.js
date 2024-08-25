import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../assets/css/searchdesigners.css";

const SearchDesigners = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    dropdown: false,
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
  });

  const refs = {
    dropdown: useRef(null),
    button: useRef(null),
    dropdown1: useRef(null),
    button1: useRef(null),
  };

  const dropdownRefs = {
    dropdown2: useRef(null),
    dropdown3: useRef(null),
    dropdown4: useRef(null),
  };

  const showDialogref = useRef(null);

  const dropdownRef4 = useRef(null);

  const toggleDropdown = (dropdownKey) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey],
    }));
    if (!dropdowns[dropdownKey] && dropdownKey === "dropdown4") {
      requestAnimationFrame(() => {
        if (dropdownRef4.current) {
          dropdownRef4.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      });
    }
  };

  const [fulltime, setFulltime] = useState(false);
  const [freelance, setFreelance] = useState(true);
  const [checktoggle, setChecktoggle] = useState(false);

  const handlefulltime = () => {
    setFulltime(true);
    setFreelance(false);
  };

  const handlefreelance = () => {
    setFreelance(true);
    setFulltime(false);
  };

  const handlechecktoggle = () => {
    setChecktoggle(!checktoggle);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs.dropdown.current &&
        !refs.dropdown.current.contains(event.target) &&
        !refs.button.current.contains(event.target)
      ) {
        setDropdowns((prevState) => ({
          ...prevState,
          dropdown: false,
        }));
      }

      if (
        refs.dropdown1.current &&
        !refs.dropdown1.current.contains(event.target) &&
        !refs.button1.current.contains(event.target)
      ) {
        setDropdowns((prevState) => ({
          ...prevState,
          dropdown1: false,
        }));
      }

      if (
        showDialogref.current &&
        !showDialogref.current.contains(event.target)
      ) {
        setShowDialog(false);
      }

      Object.keys(dropdownRefs).forEach((key) => {
        if (
          dropdownRefs[key].current &&
          !dropdownRefs[key].current.contains(event.target)
        ) {
          setDropdowns((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
      });
    };

    if (showDialog || Object.values(dropdowns).some(Boolean)) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    document.body.style.overflow = showDialog ? "hidden" : "auto";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDialog, Object.values(dropdowns).some(Boolean)]);

  return (
    <div className="wrap">
      <Navbar />
      <div id="wrap-inner">
        <div id="content">
          <div className="container1">
            <h1 className="type-heading-1">Search designers</h1>
            <div className="limited-preview">
              <div className="limited-preview__headings-container">
                <div className="limited-preview__subheading">
                  Limited preview
                </div>
                <div className="limited-preview__heading">
                  Get unlimited access for just $10/day
                </div>
              </div>
              <button className="limited-preview__cta btn2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  className="icon"
                >
                  <path
                    d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Get unlimited access
              </button>
            </div>
            <div className="designer-search-header">
              <div className="button-tab-menu">
                <button
                  ref={refs.button1}
                  onClick={() => toggleDropdown("dropdown1")}
                  id="dropdown"
                  className="btn2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path
                      d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>All designers</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </button>
                {dropdowns.dropdown1 && (
                  <div className="dropdown-content" ref={refs.dropdown1}>
                    <ul>
                      <li className="active">
                        <a href="">Any type</a>
                      </li>
                      <li>
                        <a href="">Web design</a>
                      </li>
                      <li>
                        <a href="">Animation</a>
                      </li>
                      <li style={{ margin: "0" }}>
                        <a href="">Illustration</a>
                      </li>
                    </ul>
                  </div>
                )}
                <a className="button2 btn2 active">All designers</a>
                <a className="button2 btn2">Bookmarked</a>
              </div>
              <div className="designer-search-header__actions">
                <button
                  ref={refs.button}
                  onClick={() => toggleDropdown("dropdown")}
                  id="dropdown"
                  className="btn2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path
                      d="M10 7L3 7M21 7L14 7M14 7.25195C17.4505 8.14004 20 11.2722 20 14.9999M4 14.9999C4 11.2722 6.54955 8.14004 10 7.25195M3.6 19H4.4C4.96005 19 5.24008 19 5.45399 18.891C5.64215 18.7951 5.79513 18.6422 5.89101 18.454C6 18.2401 6 17.9601 6 17.4V16.6C6 16.0399 6 15.7599 5.89101 15.546C5.79513 15.3578 5.64215 15.2049 5.45399 15.109C5.24008 15 4.96005 15 4.4 15H3.6C3.03995 15 2.75992 15 2.54601 15.109C2.35785 15.2049 2.20487 15.3578 2.10899 15.546C2 15.7599 2 16.0399 2 16.6V17.4C2 17.9601 2 18.2401 2.10899 18.454C2.20487 18.6422 2.35785 18.7951 2.54601 18.891C2.75992 19 3.03995 19 3.6 19ZM11.6 9H12.4C12.9601 9 13.2401 9 13.454 8.89101C13.6422 8.79513 13.7951 8.64215 13.891 8.45399C14 8.24008 14 7.96005 14 7.4V6.6C14 6.03995 14 5.75992 13.891 5.54601C13.7951 5.35785 13.6422 5.20487 13.454 5.10899C13.2401 5 12.9601 5 12.4 5H11.6C11.0399 5 10.7599 5 10.546 5.10899C10.3578 5.20487 10.2049 5.35785 10.109 5.54601C10 5.75992 10 6.03995 10 6.6V7.4C10 7.96005 10 8.24008 10.109 8.45399C10.2049 8.64215 10.3578 8.79513 10.546 8.89101C10.7599 9 11.0399 9 11.6 9ZM19.6 19H20.4C20.9601 19 21.2401 19 21.454 18.891C21.6422 18.7951 21.7951 18.6422 21.891 18.454C22 18.2401 22 17.9601 22 17.4V16.6C22 16.0399 22 15.7599 21.891 15.546C21.7951 15.3578 21.6422 15.2049 21.454 15.109C21.2401 15 20.9601 15 20.4 15H19.6C19.0399 15 18.7599 15 18.546 15.109C18.3578 15.2049 18.2049 15.3578 18.109 15.546C18 15.7599 18 16.0399 18 16.6V17.4C18 17.9601 18 18.2401 18.109 18.454C18.2049 18.6422 18.3578 18.7951 18.546 18.891C18.7599 19 19.0399 19 19.6 19ZM22 7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7C20 6.44772 20.4477 6 21 6C21.5523 6 22 6.44772 22 7ZM4 7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6C3.55228 6 4 6.44772 4 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Type of designer</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </button>
                {dropdowns.dropdown && (
                  <div className="dropdown-content" ref={refs.dropdown}>
                    <ul>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          role="img"
                          className="icon"
                        >
                          <path
                            d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.814 12.8132L15.5 15.4999"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <input type="text" placeholder="Search categories" />
                      </li>
                      <li className="active">
                        <a href="">Any type</a>
                      </li>
                      <li>
                        <a href="">Web design</a>
                      </li>
                      <li>
                        <a href="">Animation</a>
                      </li>
                      <li style={{ margin: "0" }}>
                        <a href="">Illustration</a>
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => setShowDialog(true)}
                  id="dropdown"
                  className="btn2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path
                      d="M6 12H18M3 6H21M9 18H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Filters</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </button>
              </div>
              <div
                className="dialog"
                style={
                  showDialog ? { opacity: "1", visibility: "visible" } : {}
                }
              >
                <div
                  ref={showDialogref}
                  className="dialog__wrapper"
                  style={showDialog ? { transform: "translateX(0)" } : {}}
                >
                  <button
                    onClick={() => setShowDialog(false)}
                    id="dialog__close"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 7L7 17M7 7L17 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <ul className="v0">
                    <li
                      ref={dropdownRefs.dropdown2}
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="">Type of designer</label>
                      <button
                        onClick={() => toggleDropdown("dropdown2")}
                        id="dropdown"
                        className="btn2"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            role="img"
                            className="icon"
                          >
                            <path
                              d="M10 7L3 7M21 7L14 7M14 7.25195C17.4505 8.14004 20 11.2722 20 14.9999M4 14.9999C4 11.2722 6.54955 8.14004 10 7.25195M3.6 19H4.4C4.96005 19 5.24008 19 5.45399 18.891C5.64215 18.7951 5.79513 18.6422 5.89101 18.454C6 18.2401 6 17.9601 6 17.4V16.6C6 16.0399 6 15.7599 5.89101 15.546C5.79513 15.3578 5.64215 15.2049 5.45399 15.109C5.24008 15 4.96005 15 4.4 15H3.6C3.03995 15 2.75992 15 2.54601 15.109C2.35785 15.2049 2.20487 15.3578 2.10899 15.546C2 15.7599 2 16.0399 2 16.6V17.4C2 17.9601 2 18.2401 2.10899 18.454C2.20487 18.6422 2.35785 18.7951 2.54601 18.891C2.75992 19 3.03995 19 3.6 19ZM11.6 9H12.4C12.9601 9 13.2401 9 13.454 8.89101C13.6422 8.79513 13.7951 8.64215 13.891 8.45399C14 8.24008 14 7.96005 14 7.4V6.6C14 6.03995 14 5.75992 13.891 5.54601C13.7951 5.35785 13.6422 5.20487 13.454 5.10899C13.2401 5 12.9601 5 12.4 5H11.6C11.0399 5 10.7599 5 10.546 5.10899C10.3578 5.20487 10.2049 5.35785 10.109 5.54601C10 5.75992 10 6.03995 10 6.6V7.4C10 7.96005 10 8.24008 10.109 8.45399C10.2049 8.64215 10.3578 8.79513 10.546 8.89101C10.7599 9 11.0399 9 11.6 9ZM19.6 19H20.4C20.9601 19 21.2401 19 21.454 18.891C21.6422 18.7951 21.7951 18.6422 21.891 18.454C22 18.2401 22 17.9601 22 17.4V16.6C22 16.0399 22 15.7599 21.891 15.546C21.7951 15.3578 21.6422 15.2049 21.454 15.109C21.2401 15 20.9601 15 20.4 15H19.6C19.0399 15 18.7599 15 18.546 15.109C18.3578 15.2049 18.2049 15.3578 18.109 15.546C18 15.7599 18 16.0399 18 16.6V17.4C18 17.9601 18 18.2401 18.109 18.454C18.2049 18.6422 18.3578 18.7951 18.546 18.891C18.7599 19 19.0399 19 19.6 19ZM22 7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7C20 6.44772 20.4477 6 21 6C21.5523 6 22 6.44772 22 7ZM4 7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6C3.55228 6 4 6.44772 4 7Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="full-time">Any</span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </button>
                      {dropdowns.dropdown2 && (
                        <div className="dropdown-content">
                          <ul>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                role="img"
                                className="icon"
                              >
                                <path
                                  d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12.814 12.8132L15.5 15.4999"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <input
                                type="text"
                                placeholder="Search categories"
                              />
                            </li>
                            <li className="active">
                              <a href="">Any type</a>
                            </li>
                            <li>
                              <a href="">Web design</a>
                            </li>
                            <li>
                              <a href="">Animation</a>
                            </li>
                            <li style={{ margin: "0" }}>
                              <a href="">Illustration</a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <label htmlFor="">Keyword search</label>
                      <button
                        id="dropdown"
                        className="btn2"
                        style={{
                          justifyContent: "initial",
                          cursor: "default",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          role="img"
                          className="icon"
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#6e6d7a",
                          }}
                        >
                          <path
                            d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.814 12.8132L15.5 15.4999"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <input type="text" placeholder="Search by keyword..." />
                      </button>
                    </li>
                    <li
                      ref={dropdownRefs.dropdown3}
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="">Location</label>
                      <button
                        onClick={() => toggleDropdown("dropdown3")}
                        id="dropdown"
                        className="btn2"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            role="img"
                            className="icon"
                          >
                            <path
                              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="full-time"> Any </span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </button>
                      {dropdowns.dropdown3 && (
                        <div className="dropdown-content">
                          <ul>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                role="img"
                                className="icon"
                              >
                                <path
                                  d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12.814 12.8132L15.5 15.4999"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <input
                                type="text"
                                placeholder="Search categories"
                              />
                            </li>
                            <li className="active">
                              <a href="">Any type</a>
                            </li>
                            <li>
                              <a href="">Web design</a>
                            </li>
                            <li>
                              <a href="">Animation</a>
                            </li>
                            <li style={{ margin: "0" }}>
                              <a href="">Illustration</a>
                            </li>
                          </ul>
                        </div>
                      )}
                      {fulltime && (
                        <div className="toggle2">
                          <input
                            onClick={handlechecktoggle}
                            type="checkbox"
                            name="includeRemote"
                            value="true"
                          />
                          <span className="full-time"> Remote work </span>
                        </div>
                      )}
                    </li>
                    <li>
                      <label htmlFor="">Work type</label>
                      <div className="check1">
                        <input
                          style={
                            fulltime
                              ? {
                                  borderColor: "#994683",
                                  backgroundColor: "#b8509a",
                                }
                              : {}
                          }
                          onClick={handlefulltime}
                          type="radio"
                          name="worktype"
                          value="fulltime"
                        />
                        <span className="full-time"> Full-time </span>
                      </div>
                      <div className="check1">
                        <input
                          style={
                            freelance
                              ? {
                                  borderColor: "#994683",
                                  backgroundColor: "#b8509a",
                                }
                              : {}
                          }
                          onClick={handlefreelance}
                          type="radio"
                          name="worktype"
                          value="fulltime"
                        />
                        <span className="full-time"> Freelance </span>
                      </div>
                    </li>
                    <li>
                      <label htmlFor="">Experience level</label>
                      <div className="check3">
                        <input type="checkbox" />
                        <span className="full-time">Junior designer</span>
                      </div>
                      <div className="check3">
                        <input type="checkbox" />
                        <span className="full-time">Mid-level designer</span>
                      </div>
                      <div className="check3">
                        <input type="checkbox" />
                        <span className="full-time">Senior designer</span>
                      </div>
                      {freelance && (
                        <div className="toggle2">
                          <input
                            onClick={handlechecktoggle}
                            type="checkbox"
                            name="includeRemote"
                            value="true"
                          />
                          <span className="full-time"> Agencies only </span>
                        </div>
                      )}
                    </li>
                    <li
                      ref={dropdownRefs.dropdown4}
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="">Max Salary </label>
                      <button
                        onClick={() => toggleDropdown("dropdown4")}
                        id="dropdown"
                        className="btn2"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            role="img"
                            className="icon"
                          >
                            <path
                              d="M6 16C6 18.2091 7.79086 20 10 20H14C16.2091 20 18 18.2091 18 16C18 13.7909 16.2091 12 14 12H10C7.79086 12 6 10.2091 6 8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8M12 2V22"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span className="full-time">None</span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </button>
                      {dropdowns.dropdown4 && (
                        <div className="dropdown-content" ref={dropdownRef4}>
                          <ul>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                role="img"
                                className="icon"
                              >
                                <path
                                  d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12.814 12.8132L15.5 15.4999"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <input
                                type="text"
                                placeholder="Search categories"
                              />
                            </li>
                            <li className="active">
                              <a href="">Any type</a>
                            </li>
                            <li>
                              <a href="">Web design</a>
                            </li>
                            <li>
                              <a href="">Animation</a>
                            </li>
                            <li style={{ margin: "0" }}>
                              <a href="">Illustration</a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <label htmlFor="">Previous company </label>
                      <button
                        id="dropdown"
                        className="btn2"
                        style={{
                          justifyContent: "initial",
                          cursor: "default",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          role="img"
                          className="icon"
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#6e6d7a",
                          }}
                        >
                          <path
                            d="M13 11H17.8C18.9201 11 19.4802 11 19.908 11.218C20.2843 11.4097 20.5903 11.7157 20.782 12.092C21 12.5198 21 13.0799 21 14.2V21M13 21V6.2C13 5.0799 13 4.51984 12.782 4.09202C12.5903 3.71569 12.2843 3.40973 11.908 3.21799C11.4802 3 10.9201 3 9.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.0799 3 6.2V21M22 21H2M6.5 7H9.5M6.5 11H9.5M6.5 15H9.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <input type="text" placeholder="Brand or company" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dialogv2">
              <div className="dialogv2__wrapper">
                <button className="dialog__close">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 7L7 17M7 7L17 17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <img src="./assets/SVG/image.svg" alt="Logo" />
                <h3>Sign up to get full access for just $10/day</h3>
                <span className="heading">billed monthly</span>
                <div className="designer-search-upsell-modal__features">
                  <div className="group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    <p>Search our entire database of available designers</p>
                  </div>
                  <div className="group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    <p>Filter by work, location, budget & more</p>
                  </div>
                  <div className="group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    <p>Unlimited messages for designer outreach</p>
                  </div>
                  <div className="group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    <p>Job board post (average 1.1k targeted clicks/month)</p>
                  </div>
                </div>
                <a className="btn-buttonv2 btn2" href="">
                  Get started
                </a>
                <p className="designer-search-upsell-modal__cancel-text">
                  Cancel anytime. No strings attached.
                </p>
              </div>
            </div>
          </div>
          <div className="designer-search-results">
            <div className="resume-user-card">
              <div className="resume-user-card__header">
                <div className="user-card-profile">
                  <span className="user-card-profile__avatar">
                    <img
                      src="./assets/images/53561cdb4acfea5898d87c2a46d6dae6.jpg"
                      alt=""
                    />
                  </span>
                  <div className="user-card-profile__details-container">
                    <div className="user-card-profile__heading">
                      Vadim Carazan
                    </div>
                    <div className="user-card-profile__subheading">Europe</div>
                  </div>
                </div>
                <div className="resume-user-card__actions">
                  <button className="btn2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      role="img"
                      className="icon"
                    >
                      <path
                        d="M3.3335 5.7C3.3335 4.5799 3.3335 4.01984 3.55148 3.59202C3.74323 3.21569 4.04919 2.90973 4.42552 2.71799C4.85334 2.5 5.41339 2.5 6.5335 2.5H9.46683C10.5869 2.5 11.147 2.5 11.5748 2.71799C11.9511 2.90973 12.2571 3.21569 12.4488 3.59202C12.6668 4.01984 12.6668 4.5799 12.6668 5.7V14.5L8.00016 11.8333L3.3335 14.5V5.7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <a href="" className="btn2">
                    {" "}
                    Get in touch
                  </a>
                </div>
              </div>
              <div className="resume-user-card__pills">
                <div className="pill1">
                  <span>Accepting New Clients</span>
                </div>
                <div className="pill2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 31.9942C0 14.3331 14.3227 0 32 0C49.6786 0 64 14.346 64 32.0058C64 49.6669 49.6773 64 32 64H29.4043V63.8845C12.9519 62.5623 0 48.7824 0 31.9942ZM32.7959 58.798C47.2364 58.377 58.8087 46.5357 58.8087 32.0058C58.8087 17.2085 46.8075 5.19039 32 5.19039C17.1912 5.19039 5.19133 17.1983 5.19133 31.9942C5.19133 46.7895 17.2021 58.798 32 58.798H32.7959Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0444 8.5504C18.6885 8.4384 18.3196 8.3223 17.9352 8.19192L19.6032 3.27673C19.7564 3.32872 20.0323 3.41669 20.3544 3.5194C20.9331 3.70393 21.6609 3.936 22.0944 4.09232L22.1177 4.10071L22.1408 4.10954C22.2594 4.15489 22.3865 4.20297 22.5198 4.25338C23.1913 4.50734 24.0198 4.82067 24.7117 5.14427L24.7425 5.15864L24.8796 5.22718C25.2052 5.379 25.6942 5.61206 26.1015 5.80617C26.3301 5.91515 26.533 6.01185 26.6668 6.07501L26.7287 6.10425L26.789 6.13671C26.803 6.14427 26.8195 6.15307 26.8381 6.16302C26.9784 6.23816 27.2401 6.37818 27.4912 6.53161L27.5601 6.5737L27.5796 6.58735C27.6079 6.60383 27.6467 6.62585 27.6947 6.65254C27.7366 6.67588 27.7769 6.69807 27.8172 6.72024C27.8251 6.72459 27.833 6.72895 27.8409 6.73331C27.8631 6.74553 27.8884 6.75944 27.911 6.77208L27.9126 6.77297C27.9241 6.77938 27.9535 6.79575 27.9874 6.81555C28.018 6.83317 28.0652 6.86007 28.1242 6.89377C28.3047 6.99678 28.5964 7.16324 28.8672 7.32183C29.1462 7.4852 29.572 7.73684 29.8871 7.95772C30.2247 8.16503 30.5958 8.42209 30.8429 8.59323C30.8874 8.62408 30.9279 8.65213 30.9634 8.6766C31.1534 8.79229 31.3394 8.92346 31.4688 9.01621C31.654 9.14891 31.8556 9.29924 32.0394 9.43745C32.1244 9.5013 32.202 9.55988 32.2753 9.61525C32.3729 9.68889 32.4629 9.75684 32.5526 9.82395C32.6266 9.87937 32.6883 9.92504 32.7381 9.96122C32.7627 9.9791 32.7819 9.99283 32.7963 10.003C32.8086 10.0117 32.8144 10.0156 32.8147 10.0158L32.8823 10.0609L32.9475 10.1105C35.8123 12.2928 38.3635 14.8567 40.541 17.7143L40.5431 17.7169L40.5451 17.7196C42.9523 20.8955 44.8529 24.421 46.171 28.1728C50.0981 39.1418 48.9432 51.8142 42.7709 61.8175L38.3527 59.0924C43.6719 50.4716 44.696 39.4477 41.281 29.9155L41.2782 29.9077L41.2755 29.8999C40.1378 26.6593 38.4949 23.6089 36.4095 20.8569C34.5227 18.3816 32.3193 16.1648 29.8537 14.2791C29.7172 14.1845 29.566 14.0722 29.4424 13.9797C29.3488 13.9097 29.2388 13.8267 29.1303 13.7448C29.0574 13.6898 28.9853 13.6354 28.9193 13.5858C28.7411 13.4518 28.5792 13.3313 28.4451 13.2353C28.3256 13.1497 28.2759 13.1181 28.2762 13.1176C28.2763 13.1176 28.2765 13.1176 28.2769 13.1178L28.1996 13.0744L28.1095 13.0133C27.9769 12.9233 27.8588 12.8416 27.7506 12.7667C27.513 12.6023 27.3227 12.4706 27.1296 12.356L27.0032 12.2809L26.886 12.1921C26.8933 12.1976 26.8928 12.1973 26.8825 12.1904C26.8632 12.1776 26.8098 12.1421 26.7098 12.08C26.578 11.9983 26.4164 11.9018 26.2437 11.8006C25.9987 11.6572 25.7756 11.5299 25.5991 11.4292C25.5168 11.3822 25.4446 11.341 25.3851 11.3067L25.3797 11.3036C25.3706 11.2986 25.3572 11.2911 25.337 11.28C25.3308 11.2766 25.324 11.2729 25.3168 11.2689C25.2767 11.2469 25.2232 11.2174 25.1687 11.1871C25.1049 11.1516 25.0275 11.108 24.9522 11.0639C24.911 11.0398 24.8342 10.9946 24.7482 10.9388C24.6425 10.8758 24.5291 10.8149 24.3941 10.7424C24.3921 10.7413 24.3901 10.7402 24.3881 10.7391C24.2266 10.6627 24.0256 10.5669 23.8123 10.4651C23.4109 10.2737 22.9655 10.0614 22.6564 9.91764L22.6231 9.90216L22.4834 9.83233C21.9933 9.60511 21.4065 9.38267 20.7493 9.13349C20.6064 9.07932 20.4602 9.02389 20.3109 8.96687C19.9058 8.82147 19.4851 8.68909 19.0444 8.5504ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.9753 20.9031C37.8095 19.4886 45.039 15.0944 49.9836 8.8396L54.0564 12.0581C48.3423 19.2864 40.0009 24.3674 30.8972 26.011L30.8966 26.0111C26.3636 26.8284 21.7063 26.856 17.1601 26.0225C12.6263 25.2144 8.25142 23.5868 4.29462 21.2106L6.96759 16.7612C10.3772 18.8087 14.1561 20.2156 18.0773 20.9137L18.0841 20.9149L18.0909 20.9162C22 21.6336 26.0293 21.6145 29.9747 20.9033"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.1061 58.3111C20.5381 35.6959 43.5855 23.2062 62.4346 28.3436L61.0692 33.3513C45.0688 28.9903 25.0407 39.714 21.2006 59.3091L16.1061 58.3111Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>PRO</span>
                </div>
              </div>
              <ul className="resume-user-card__shots">
                <li className="shot-thumbnail-container">
                  <div className="shot-thumbnail-base">
                    <img
                      src="./assets/images/original-105bbe8454160c413a87dbe13b7367f6.jpg"
                      alt=""
                    />
                  </div>
                </li>
                <li className="shot-thumbnail-container">
                  <div className="shot-thumbnail-base">
                    <img
                      src="./assets/images/original-c2bebcb444fedb0ea163cb521c63444f.jpg"
                      alt=""
                    />
                  </div>
                </li>
                <li className="shot-thumbnail-container">
                  <div className="shot-thumbnail-base">
                    <img
                      src="./assets/images/original-960dfa9a532a3ccd196f9df80f5a8d1c.png"
                      alt=""
                    />
                  </div>
                </li>
                <li className="shot-thumbnail-container">
                  <div className="shot-thumbnail-base">
                    <img
                      src="./assets/images/original-c8c852498264c85f38accf576a4c6906.jpg"
                      alt=""
                    />
                  </div>
                </li>
                <li className="shot-thumbnail-container">
                  <div className="shot-thumbnail-base">
                    <img
                      src="./assets/images/original-d4c99de2e8491e7b7de2578db9499735.jpg"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
              <div className="resume-user-card__meta">
                <div className="resume-user-card__meta-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path
                      d="M6 11V15M18 9V13M17 4C19.4487 4 20.7731 4.37476 21.4321 4.66544C21.5199 4.70415 21.5638 4.72351 21.6904 4.84437C21.7663 4.91682 21.9049 5.12939 21.9405 5.22809C22 5.39274 22 5.48274 22 5.66274V16.4111C22 17.3199 22 17.7743 21.8637 18.0079C21.7251 18.2454 21.5914 18.3559 21.3319 18.4472C21.0769 18.5369 20.562 18.438 19.5322 18.2401C18.8114 18.1017 17.9565 18 17 18C14 18 11 20 7 20C4.55129 20 3.22687 19.6252 2.56788 19.3346C2.48012 19.2958 2.43624 19.2765 2.3096 19.1556C2.23369 19.0832 2.09512 18.8706 2.05947 18.7719C2 18.6073 2 18.5173 2 18.3373L2 7.58885C2 6.68009 2 6.2257 2.13628 5.99214C2.2749 5.75456 2.40859 5.64412 2.66806 5.55281C2.92314 5.46305 3.43803 5.56198 4.46783 5.75985C5.18862 5.89834 6.04348 6 7 6C10 6 13 4 17 4ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span style={{ marginTop: "4px" }}> $130-140k (USD) </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container2">
            <div className="limited-card">
              <div className="limited-card__media-container">
                <video
                  src="./assets/Videos/82e6708cd9ca130380774f3655800789.mp4"
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <h1 className="limited-card__heading">
                You haven’t bookmarked any designers yet
              </h1>
              <p className="limited-card__copy">
                When browsing, click the bookmark button to save designers for
                reference later.
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchDesigners;
