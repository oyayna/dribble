import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import "../assets/css/shots.css";

const Shots = () => {
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
                <li className="active">
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
                <li>
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
          <div className="container-large">
            <ul className="empty-shots-list">
              <li className="shot-placeholder upload-upsell">
                <div className="upload-upsell-container">
                  <div className="upload-upsell-icon">
                    <div className="triangle-up light"></div>
                    <div className="triangle-up dark"></div>
                  </div>
                  <h2 className="upload-upsell-title">
                    Upload your first shot
                  </h2>
                  <div className="upload-upsell-content">
                    <p className="upload-upsell-description">
                      Show off your best work. Get feedback, likes and be a part
                      of a growing community.
                    </p>
                    <a href=""> Upload your first shot </a>
                  </div>
                </div>
              </li>
              <li className="shot-placeholder empty-shot-item"></li>
              <li className="shot-placeholder empty-shot-item"></li>
              <li className="shot-placeholder empty-shot-item"></li>
              <li className="shot-placeholder empty-shot-item"></li>
              <li className="shot-placeholder empty-shot-item"></li>
            </ul>
            {/* <div className="home-feed" style={{ margin: 0 }}>
              <div className="container-ml" style={{ padding: 0 }}>
                <ol className="short-grid">
                  <li
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      userSelect: "none",
                    }}
                  >
                    <img
                      src="/assets/images/original-2dee67eea1449af11ec7cc15c885cac8 (9).jpg"
                      alt="Image 1"
                    />
                    <ul className="hover-text">
                      <li>
                        <a className="shot-title" href="#">
                          Hello world !
                        </a>
                      </li>
                      <li>
                        <ul className="flex">
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                role="img"
                                className="icon"
                              >
                                <path
                                  d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="info">
                      <li />
                      <li>
                        <ul style={{ gap: "20px" }} className="contentv2">
                          <li className="digit">
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                role="img"
                                className="icon fill-current shot-tools-icon"
                              >
                                <path
                                  d="M14 8C14 11.3137 11.3137 14 8 14C7.2019 14 6.4402 13.8442 5.74366 13.5613C5.61035 13.5072 5.54369 13.4801 5.48981 13.468C5.43711 13.4562 5.3981 13.4519 5.34409 13.4519C5.28887 13.4519 5.22872 13.4619 5.10843 13.4819L2.73651 13.8772C2.48812 13.9186 2.36393 13.9393 2.27412 13.9008C2.19552 13.8671 2.13289 13.8045 2.09917 13.7259C2.06065 13.6361 2.08135 13.5119 2.12275 13.2635L2.51807 10.8916C2.53812 10.7713 2.54814 10.7111 2.54814 10.6559C2.54813 10.6019 2.54381 10.5629 2.532 10.5102C2.51992 10.4563 2.49285 10.3897 2.43871 10.2563C2.15582 9.5598 2 8.7981 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                                  fill="currentColor"
                                ></path>
                              </svg>{" "}
                            </a>
                            165
                          </li>
                          <li className="digit">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                role="img"
                                className="icon fill-current shot-tools-icon"
                              >
                                <path
                                  d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                                  fill="white"
                                ></path>
                              </svg>{" "}
                            </span>
                            29.9k
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ol>
                <div id="buttont2">
                  <a className="btn-button btn2" href="">
                    {" "}
                    Load more work{" "}
                  </a>
                </div>
              </div>
            </div> */}
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

export default Shots;
