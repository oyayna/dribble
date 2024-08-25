import React, { useState, useRef, useEffect } from "react";
import "../assets/css/postjob.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PostJob = () => {
  const [dropdowns, setDropdowns] = useState({
    dropdown: false,
    dropdown1: false,
    dropdown2: false,
  });

  const dropdownRefs = {
    dropdown: useRef(null),
    dropdown1: useRef(null),
    dropdown2: useRef(null),
  };

  const toggleDropdown = (dropdownKey) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
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

    console.log(Object.values(dropdowns).some(Boolean));

    if (Object.values(dropdowns).some(Boolean)) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Object.values(dropdowns).some(Boolean)]);

  return (
    <>
      <Navbar />
      <div id="wrap">
        <div id="wrap-inner" style={{ width: "100%", padding: "0" }}>
          <div
            id="content"
            style={{ position: "relative", margin: "0 auto", fontSize: "14px" }}
          >
            <div className="container-job-board">
              <div className="job-board-gradient"></div>
              <div className="header">
                <div className="header-title">
                  <h1>Post a job on Dribbble</h1>
                  <h2>
                    The #1 job board for hiring designers and creative
                    professionals.
                  </h2>
                </div>
              </div>
              <div className="content">
                <div data-v-5d568711 className="job-creation">
                  <section className="user-form-container">
                    <header>
                      <span className="title">Tell us about your role</span>
                      <div className="step-counter">
                        1/4
                        <span className="color-deep-blue-sea-light-40">4</span>
                      </div>
                    </header>
                    <form action="">
                      <div className="form-field-container">
                        <label htmlFor="">
                          Job title <span className="color-lobster">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Senior Product Designer"
                        />
                      </div>
                      <div className="form-field-container">
                        <label htmlFor="">
                          Add your job description
                          <span className="color-lobster">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Senior Product Designer"
                        />
                      </div>
                      <div className="form-field-container">
                        <label htmlFor=""> Job location </label>
                        <input
                          type="text"
                          placeholder='e.g. "New York City" or "San Francisco"'
                        />
                        <span className="note">
                          If left blank, location will be set to "Remote"
                        </span>
                      </div>
                      <div className="form-field-container">
                        <label htmlFor="">
                          Workplace type
                          <span className="color-lobster">*</span>
                        </label>
                        <div
                          className="btn-dropdown btn-dropV1"
                          ref={dropdownRefs.dropdown}
                        >
                          <div
                            className="btn-dropdown-link"
                            onClick={() => toggleDropdown("dropdown")}
                          >
                            <span>Remote</span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                              </svg>
                            </span>
                          </div>
                          {dropdowns.dropdown && (
                            <div className="btn-dropdown-options">
                              <ul>
                                <li className="active">
                                  <span className=""> Remote </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> On-site </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> Hybrid </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-field-container">
                        <label htmlFor="">
                          What type of designer are you looking for?
                          <span className="color-lobster">*</span>
                        </label>
                        <div
                          className="btn-dropdown btn-dropV2"
                          ref={dropdownRefs.dropdown1}
                        >
                          <div
                            className="btn-dropdown-link"
                            onClick={() => toggleDropdown("dropdown1")}
                          >
                            <span>Brand / Graphic Design</span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                              </svg>
                            </span>
                          </div>
                          {dropdowns.dropdown1 && (
                            <div className="btn-dropdown-options">
                              <ul>
                                <li>
                                  <span className=""> Animation </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li className="active">
                                  <span className="">
                                    {" "}
                                    Brand / Graphic Design{" "}
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> Illustration </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> Mobile Design </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> UI / Visual Design </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> Product Design </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className="">
                                    {" "}
                                    UX Design / Research{" "}
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className=""> Web Design </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-field-container">
                        <label htmlFor="">
                          Employment type
                          <span className="color-lobster">*</span>
                        </label>
                        <div
                          className="btn-dropdown btn-dropV3"
                          ref={dropdownRefs.dropdown2}
                        >
                          <div
                            className="btn-dropdown-link"
                            onClick={() => toggleDropdown("dropdown2")}
                          >
                            <span> Full-time employee </span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                              </svg>
                            </span>
                          </div>
                          {dropdowns.dropdown2 && (
                            <div className="btn-dropdown-options">
                              <ul>
                                <li className="active">
                                  <span className=""> Full-time employee </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                                <li>
                                  <span className="">
                                    {" "}
                                    Freelance / Contract hire{" "}
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-check"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-field-container">
                        <label htmlFor="">
                          Where can people apply?
                          <span className="color-lobster">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. https://greenhouse.io/f73jf7wh"
                        />
                        <span className="note">
                          This is where people go to apply for your job.
                        </span>
                      </div>
                      <div className="company-information">
                        <header className="title">Company Information</header>
                        <div className="company-field-container">
                          <label htmlFor="">
                            What's your company name?
                            <span
                              style={{
                                color: "#ff5555",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <input type="text" />
                        </div>
                        <div className="company-field-container">
                          <label htmlFor="">
                            Your company logo
                            <span
                              style={{
                                color: "#ff5555",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <div className="fixed">
                            <div className="upload-logo-container">
                              <button className="btn2">Choose image</button>
                              <div className="preview-container">
                                <div className="progress-container">
                                  <img
                                    src="/assets/images/53561cdb4acfea5898d87c2a46d6dae6.jpg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="color-deep-blue-sea-light-40">
                              Recommended dimensions: 144x144 px
                            </div>
                          </div>
                        </div>
                        <div className="company-field-container">
                          <label htmlFor="">
                            Your company website
                            <span
                              style={{
                                color: "#ff5555",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. https://domain.com"
                          />
                        </div>
                      </div>
                      <div className="handle-buttons">
                        <button className="btn2">Cancel</button>
                        <button className="btn2">Continue</button>
                      </div>
                    </form>
                  </section>
                  <section className="step1-footer">
                    <hr />
                    <div className="used-by">
                      <span className="desc">
                        Used by some of the world’s best design-forward
                        companies
                      </span>
                      <div className="icons">
                        <img src="/assets/SVG/mailchimp-9d6915c5.svg" alt="" />
                        <img src="/assets/SVG/fb-d36d0952.svg" alt="" />
                        <img src="/assets/SVG/vimeo-25a73af8.svg" alt="" />
                        <img src="/assets/SVG/canva-325a6ed2.svg" alt="" />
                        <img src="/assets/SVG/asana-22d5508e.svg" alt="" />
                        <img src="/assets/SVG/disney-a0c279f3.svg" alt="" />
                        <img src="/assets/SVG/tr-2649e80e.svg" alt="" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
