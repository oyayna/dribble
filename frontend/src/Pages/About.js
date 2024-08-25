import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const modelRef = useRef(null);

  const checkScrollPosition = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollAmount = 300;

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
    setScrolled(false);
  };

  const handleClick = () => {
    if (navigator.onLine) {
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        setShowModal(true);
      }, 500);
    } else {
      setError(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const currentRef = categoriesRef.current;
    if (currentRef) {
      checkScrollPosition();

      const scrollAmount = currentRef.scrollWidth - currentRef.clientWidth;
      currentRef.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      currentRef.addEventListener("scroll", checkScrollPosition);
    }
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 335 && isBannerVisible) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBannerVisible]);

  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setShowModal(false);
        setError(false);
      }
    };

    if (showModal || isProcessing || error) {
      document.addEventListener("mousedown", handleClickOutside2);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, [showModal, isProcessing, error]);

  return (
    <>
      <Navbar />
      <div style={{ overflow: "hidden" }} id="wrap">
        <div className="profile-masthead">
          <div className="profile-simple-masthead">
            <div className="container-large masthead-wrapper">
              <div className="masthead-avatar">
                <img
                  src="./assets/images/89a9935144af940ba0e24a955356faaa.jpg"
                  alt=""
                />
              </div>
              <div className="masthead-content">
                <h1 className="masthead-profile-name">Ak Adrago</h1>
                <p className="masthead-profile-locality">New York City, NY</p>
                <p className="masthead-profile-specializations">Web Design</p>
                <div className="masthead-actions">
                  <button className="btn2" onClick={handleClick}>
                    Get in touch
                  </button>
                  <Link to="/edit-profile" className="btn2">
                    Edit Profile
                  </Link>
                  <div
                    className="actions-menu-relative-container"
                    ref={dropdownRef}
                  >
                    <button
                      className="btn2"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        role="img"
                        className="icon fill-current"
                      >
                        <circle
                          cx="2"
                          cy="8"
                          r="1.5"
                          fill="currentColor"
                        ></circle>
                        <circle
                          cx="14"
                          cy="8"
                          r="1.5"
                          fill="currentColor"
                        ></circle>
                        <circle
                          cx="8"
                          cy="8"
                          r="1.5"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </button>
                    {showDropdown && (
                      <div className="action-menu-container">
                        <ul className="action-menu-items">
                          <li>
                            <Link to="/general" className="show-list-ui">
                              Edit your account settings
                            </Link>
                          </li>
                          <li>
                            <button className="show-list-ui">
                              Edit work preferences
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-large">
          <div className="profile-subnav">
            <div className="scrolling-subnav">
              {showLeftButton && (
                <button className="btn-left" onClick={scrollLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                  </svg>
                </button>
              )}
              <ul className="scrolling-subnav-list" ref={categoriesRef}>
                <li>
                  <Link to="/shots" className="btn2">
                    Work
                  </Link>
                </li>
                <li>
                  <Link to="/boostedshots" className="btn2">
                    Boosted Shots
                  </Link>
                </li>
                <li>
                  <Link to="/boosts" className="btn2">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link to="/likes" className="btn2">
                    Liked Shots
                  </Link>
                </li>
                <li className="active">
                  <Link to="/about" className="btn2">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/drafts" className="btn2">
                    Drafts
                  </Link>
                </li>
              </ul>
              {showRightButton && (
                <button className="btn-right" onClick={scrollRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    className="icon"
                  >
                    <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div id="wrap-inner" className="flushed">
          <div className="container-large" style={{ maxWidth: "1152px" }}>
            <div className="about-content">
              <div className="about-content-main">
                <div className="content-section">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: "initial",
                    }}
                    className="share-actions"
                  >
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="aoevi2xlaqim8cvqrd6qvtqakvay7gv4"
                        role="img"
                        viewBox="0 0 24 24"
                        className="icon"
                      >
                        <title id="aoevi2xlaqim8cvqrd6qvtqakvay7gv4">
                          Facebook icon
                        </title>
                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
                      </svg>
                      Share
                    </a>
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="akfkwh3pha5w6nhc2g6vn07i1avszh9"
                        role="img"
                        viewBox="0 0 24 24"
                        className="icon"
                      >
                        <title id="akfkwh3pha5w6nhc2g6vn07i1avszh9">
                          Twitter icon
                        </title>
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                      </svg>
                      Tweet
                    </a>
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        viewBox="0 0 24 24"
                        role="img"
                        className="icon"
                      >
                        <path d="m7.438 16.562c.293.293.677.44 1.061.44s.768-.147 1.061-.44l7.002-7.002c.586-.586.586-1.536 0-2.122s-1.536-.586-2.122 0l-7.002 7.002c-.586.586-.586 1.536 0 2.122zm3.501 3.078c-1.813 1.814-4.765 1.814-6.58 0-1.814-1.814-1.814-4.765 0-6.579l3.29-3.29-2.121-2.121-3.29 3.29c-2.984 2.984-2.984 7.839 0 10.823 1.492 1.491 3.452 2.237 5.412 2.237s3.92-.746 5.411-2.238l3.29-3.29-2.122-2.122zm10.823-17.402c-2.983-2.984-7.839-2.984-10.823 0l-3.29 3.29 2.122 2.122 3.29-3.29c.907-.907 2.098-1.36 3.289-1.36s2.383.454 3.29 1.361c1.814 1.814 1.814 4.765 0 6.579l-3.29 3.29 2.122 2.122 3.29-3.29c2.984-2.985 2.984-7.84 0-10.824z"></path>
                      </svg>
                      Copy
                    </a>
                  </div>
                </div>
                {/* <div className="content-section">
                  <h2 className="section-label">Biography</h2>
                  <a href="" className="add-link">
                    Add Bio
                  </a>
                </div> */}
                <div className="content-section can-edit">
                  <h2 className="section-label">Biography</h2>
                  <div className="bio">
                    <p className="bio-text">Nothing</p>
                  </div>
                  <div className="edit-overlay">
                    <a href="" className="edit-link">
                      Edit Bio
                    </a>
                  </div>
                </div>
                <div className="content-section profile-info-section">
                  <p className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      role="img"
                      className="icon icon-16"
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
                    <span style={{ flexGrow: "1" }}></span>
                  </p>
                  <p className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      role="img"
                      className="icon icon-16"
                    >
                      <path
                        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span style={{ flexGrow: "1" }}>
                      {" "}
                      Member since Apr 2024{" "}
                    </span>
                  </p>
                </div>
                {/* <div className="content-section">
                  <h2 className="section-label">Skills</h2>
                  <a href="" className="add-link">
                    Add Skills
                  </a>
                </div> */}
                <div className="content-section can-edit">
                  <h2 className="section-label">Skills</h2>
                  <ul className="skills-list">
                    <li>
                      <a href="">backend development</a>
                    </li>
                    <li>
                      <a href="">backend development</a>
                    </li>
                  </ul>
                  <div className="edit-overlay">
                    <a href="" className="edit-link">
                      {" "}
                      Edit Skills{" "}
                    </a>
                  </div>
                </div>
                <div className="content-section hiring-traits-section can-edit">
                  <div className="edit-overlay">
                    <a href="" className="edit-link">
                      {" "}
                      Edit Traits{" "}
                    </a>
                  </div>
                  <div className="hiring-trait">
                    <h3 className="section-label">Top Specialties</h3>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left"> Web Design </span>
                      <span className="hiring-trait-right"> 1–2 years </span>
                    </p>
                  </div>
                  <div className="hiring-trait">
                    <h3 className="section-label">Work History</h3>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left">
                        {" "}
                        WorkHistory2 at Company2{" "}
                      </span>
                      <span className="hiring-trait-right"> 2012–2013 </span>
                    </p>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left">
                        {" "}
                        WorkHistory at Company{" "}
                      </span>
                      <span className="hiring-trait-right"> 1977–2024 </span>
                    </p>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left">
                        {" "}
                        WorkHistory at Company{" "}
                      </span>
                      <span className="hiring-trait-right"> 1977–2024 </span>
                    </p>
                  </div>
                  <div className="hiring-trait">
                    <h3 className="section-label">Education</h3>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left">
                        {" "}
                        Degree, schoolOrunevercity{" "}
                      </span>
                      <span className="hiring-trait-right"> 1974 </span>
                    </p>
                  </div>
                  <div className="hiring-trait">
                    <h3 className="section-label">Top Specialties</h3>
                    <p className="hiring-trait-item">
                      <span className="hiring-trait-left"> Web Design </span>
                      <span className="hiring-trait-right"> 1–2 years </span>
                    </p>
                  </div>
                  <div className="hiring-trait">
                    <h3 className="section-label">Seeking</h3>
                    <p
                      className="hiring-trait-item"
                      style={{ display: "block" }}
                    >
                      Freelance or contract opportunities
                    </p>
                    <p
                      className="hiring-trait-item"
                      style={{ display: "block" }}
                    >
                      {" "}
                      Full-time opportunities{" "}
                    </p>
                  </div>
                </div>
                <div className="content-section profile-stats-section">
                  <a href="">0 followers</a>
                  <a href="">1 following</a>
                </div>
              </div>
              <div className="about-content-sidebar">
                <div className="content-section">
                  <div className="share-actions">
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="aoevi2xlaqim8cvqrd6qvtqakvay7gv4"
                        role="img"
                        viewBox="0 0 24 24"
                        className="icon"
                      >
                        <title id="aoevi2xlaqim8cvqrd6qvtqakvay7gv4">
                          Facebook icon
                        </title>
                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
                      </svg>
                      Share
                    </a>
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="akfkwh3pha5w6nhc2g6vn07i1avszh9"
                        role="img"
                        viewBox="0 0 24 24"
                        className="icon"
                      >
                        <title id="akfkwh3pha5w6nhc2g6vn07i1avszh9">
                          Twitter icon
                        </title>
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                      </svg>
                      Tweet
                    </a>
                    <a href="" className="btn2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        viewBox="0 0 24 24"
                        role="img"
                        className="icon"
                      >
                        <path d="m7.438 16.562c.293.293.677.44 1.061.44s.768-.147 1.061-.44l7.002-7.002c.586-.586.586-1.536 0-2.122s-1.536-.586-2.122 0l-7.002 7.002c-.586.586-.586 1.536 0 2.122zm3.501 3.078c-1.813 1.814-4.765 1.814-6.58 0-1.814-1.814-1.814-4.765 0-6.579l3.29-3.29-2.121-2.121-3.29 3.29c-2.984 2.984-2.984 7.839 0 10.823 1.492 1.491 3.452 2.237 5.412 2.237s3.92-.746 5.411-2.238l3.29-3.29-2.122-2.122zm10.823-17.402c-2.983-2.984-7.839-2.984-10.823 0l-3.29 3.29 2.122 2.122 3.29-3.29c.907-.907 2.098-1.36 3.289-1.36s2.383.454 3.29 1.361c1.814 1.814 1.814 4.765 0 6.579l-3.29 3.29 2.122 2.122 3.29-3.29c2.984-2.985 2.984-7.84 0-10.824z"></path>
                      </svg>
                      Copy
                    </a>
                  </div>
                </div>
                <div className="content-section profile-info-section">
                  <p className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      role="img"
                      className="icon icon-16"
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
                    <span style={{ flexGrow: "1" }}></span>
                  </p>
                  <p className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      role="img"
                      className="icon icon-16"
                    >
                      <path
                        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span style={{ flexGrow: "1" }}>
                      {" "}
                      Member since Apr 2024{" "}
                    </span>
                  </p>
                </div>
                {/* <div className="content-section">
                  <h2 className="section-label">Social</h2>
                  <a href="" className="add-link">
                    Add social/portfolio links
                  </a>
                </div> */}
                <div className="content-section can-edit">
                  <h2 className="section-label">Social</h2>
                  <ul className="social-links-list">
                    <li>
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          role="img"
                        >
                          <path
                            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22M2.50002 9H21.5M2.5 15H21.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span className="label">Mywebsite.com</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-twitter-97b7f35c342489ef2862551036a5df22a891be901a99cd48ae7057c0f3d65898.png" />
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-facebook-77c203b434aabfd74214bcd7a326840cafd6b4a6ab158983b23d5f798d73a70d.png" />
                        <span className="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-instagram-e3d35ad25fd783df5f82863058c320d1d9b7568810cfb7037810674ef5a34d13.png" />
                        <span className="label">Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-github-c75905bc84059849b8d6edcc297e2ed57a1bc22260ae06ed3f894155f4420d9e.png" />
                        <span className="label">GitHub</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-creative_market-e8cbf36293c3d8ecbd817c453f1ae97fca1b972cc5d0885ac82dd8d121ab8e2e.png" />
                        <span className="label">Creative Market</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-codepen-9535a764112471864ddc2ccd73d08f69359fab6f07bdfaed76146271e8c10770.png" />
                        <span className="label">CodePen</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-medium-71e90a5428a530d7388282d9fa878916bd6836d0e1786588dd715f098798abe1.png" />
                        <span className="label">Medium</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-behance-721f972e6a6ab986f64415e742055c4184c0c26c9c74f5abdd2d5c8fbd9def4c.png" />
                        <span className="label">Behance</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-linkedin-9ff9a92c80e3b1d8b50358d5e82de394b094b33d622eec97dcabc7534499459b.png" />
                        <span className="label">LinkedIn</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="./assets/images/icon-elsewhere-vimeo-974ed51bd48b383ad8a9ba31b7cbdf7b010d2309b48b0886810e937e91d9bd5e.png" />
                        <span className="label">Vimeo</span>
                      </a>
                    </li>
                  </ul>
                  <div className="edit-overlay">
                    <a href="" className="edit-link">
                      Edit Social Links
                    </a>
                  </div>
                </div>
                <div className="content-section profile-stats-section">
                  <a href="">0 followers</a>
                  <a href="">1 following</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`sticky-hire-widget ${scrolled ? "visible" : ""}`}>
          <button onClick={handleCloseBanner}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12ZM16.707 16.707C17.098 16.316 17.098 15.684 16.707 15.293L13.414 12L16.707 8.707C17.098 8.316 17.098 7.684 16.707 7.293C16.316 6.902 15.684 6.902 15.293 7.293L12 10.586L8.707 7.293C8.316 6.902 7.684 6.902 7.293 7.293C6.902 7.684 6.902 8.316 7.293 8.707L10.586 12L7.293 15.293C6.902 15.684 6.902 16.316 7.293 16.707C7.488 16.902 7.744 17 8 17C8.256 17 8.512 16.902 8.707 16.707L12 13.414L15.293 16.707C15.488 16.902 15.744 17 16 17C16.256 17 16.512 16.902 16.707 16.707Z"
              ></path>
            </svg>
          </button>
          <p className="sticky-widget-label">
            <i className="availability-indicator"></i>
            <span>Available for new projects</span>
          </p>
          <button className="btn2" onClick={handleClick}>
            Get in touch
          </button>
          <div className="sticky-widget-avatar">
            <img src="./assets/images/89a9935144af940ba0e24a955356faaa.jpg" />
          </div>
        </div>
        <div
          className={`overlay ${
            showModal
              ? "overlay-visible"
              : "" || isProcessing
              ? "overlay-visible"
              : "" || error
              ? "overlay-visible"
              : ""
          }`}
        >
          <div
            className={`lightbox ${
              showModal
                ? "lightbox-visible"
                : "" || isProcessing
                ? "lightbox-visible"
                : "" || error
                ? "lightbox-visible"
                : ""
            }`}
          >
            {showModal && (
              <form
                ref={modelRef}
                onSubmit={(e) => e.preventDefault()}
                className="message-flow-form overlay-form"
              >
                <div className="message-designers-form">
                  <button
                    type="button"
                    className="cannel"
                    onClick={handleCloseModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      fill="currentColor"
                      role="img"
                    >
                      <path d="M7.22876 5.81455C6.83824 5.42403 6.20507 5.42403 5.81455 5.81455C5.42402 6.20507 5.42402 6.83824 5.81455 7.22876L9.58578 11L5.81455 14.7712C5.42402 15.1618 5.42402 15.7949 5.81455 16.1854C6.20507 16.576 6.83824 16.576 7.22876 16.1854L11 12.4142L14.7712 16.1854C15.1618 16.576 15.7949 16.576 16.1854 16.1854C16.576 15.7949 16.576 15.1618 16.1854 14.7712L12.4142 11L16.1854 7.22876C16.576 6.83824 16.576 6.20507 16.1854 5.81455C15.7949 5.42403 15.1618 5.42403 14.7712 5.81455L11 9.58579L7.22876 5.81455Z"></path>
                    </svg>
                  </button>
                  <div className="items-center message-designers-hero">
                    <a href="">
                      <img src="./assets/images/89a9935144af940ba0e24a955356faaa.jpg" />
                    </a>
                    <div className="profile-message-info">
                      <h2>
                        Let's get your request <br /> ready to send
                      </h2>
                    </div>
                  </div>
                  <div className="prompt for-self">
                    <h2>Preview</h2>
                    <p>
                      While you can't message yourself, hirers will see this
                      when they want to contact you.
                    </p>
                  </div>
                  <div className="message-flow">
                    <div>
                      <div className="form">
                        <label>
                          What are you looking to design...{" "}
                          <span className="counter">0/80</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. landing page, iOS icon"
                        />
                      </div>
                      <div className="form">
                        <label>How urgent is your request?</label>
                        <div className="radio-pills">
                          <div>
                            <input type="radio" />
                            <button className="btn2">ASAP</button>
                          </div>
                          <div>
                            <input type="radio" />
                            <button className="btn2">
                              Within the next month
                            </button>
                          </div>
                          <div>
                            <input type="radio" />
                            <button className="btn2">Not urgent</button>
                          </div>
                        </div>
                      </div>
                      <div className="form">
                        <label style={{ display: "block" }}>
                          Tell us more about the project{" "}
                          <span style={{ color: "#ff2424" }}>*</span>
                        </label>
                        <textarea
                          type="text"
                          placeholder="Looking to add another landing page to my current Webflow site...."
                        />
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        type="button"
                        className="nevermind-btn"
                        onClick={handleCloseModal}
                      >
                        Nevermind
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {isProcessing && (
              <div className="loading">
                <img
                  src="./assets/images/processing-0adc8c1c97e052c873286dfd67ae4b039dd9bb29e66d9cff02e3bf56a77004e9.gif"
                  alt=""
                />
                <p>loading...</p>
              </div>
            )}
            {error && (
              <div className="error" ref={modelRef}>
                Something went wrong. Please refresh the page and try again.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
