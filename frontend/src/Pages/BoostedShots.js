import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const BoostedShots = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
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
                <li className="active">
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
        <div id="wrap-inner" className="flushed" style={{ padding: "120px 0" }}>
          <div className="container-large"></div>
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

export default BoostedShots;
