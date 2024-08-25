import React, { useState } from "react";
import "../assets/css/jobs.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const handleClickFilter = () => {
    setShowFilters(!showFilters);
  };
  return (
    <>
      <Navbar />
      <main className="container-medium">
        <div className="hero-banner">
          <div className="banner-content">
            <h1 className="job-banner-heading">
              The #1 Job Board for Graphic Design Jobs
            </h1>
            <p className="job-banner-parag">
              Dribbble is the heart of the design community and the best
              resource to discover and connect with designers and jobs
              worldwide.
            </p>
            <div className="banner-buttons-container">
              <a href="" className="job-banner-cta btn2">
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
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Post a job
              </a>
            </div>
          </div>
        </div>
        <div className="dd-hero-subnav">
          <ul className="dd-hero-subnav-list">
            <li className="dd-hero-subnav-item active">
              <a href=""> Job Board </a>
            </li>
            <li className="dd-hero-subnav-item">
              <a href="">Designer Search</a>
            </li>
          </ul>
        </div>
        <div className="content-container">
          <div className="job-listings-container">
            <form action="" className="search-input-form">
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
              <input type="text" placeholder="Search by company, skill, tag…" />
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "40px 0",
              }}
            >
              <div style={{ marginRight: "50px" }}>
                <h2 className="new-opportunities-heading">Recent posts</h2>
                <p
                  style={{
                    marginTop: "16px",
                    color: "#3d3d4e",
                    fontFamily: "'Anek Devanagari', sans-serif",
                    fontOpticalSizing: "auto",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  5 new opportunities posted today!
                </p>
              </div>
              <button
                onClick={handleClickFilter}
                className="btn-button btn2"
                href=""
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"
                  ></path>
                </svg>
                Filters
              </button>
            </div>
            <ol className="job-board-job-list">
              <li className="job-list-item job-list-item--boosted">
                <a href=""></a>
                <div className="job-details-container">
                  <img
                    src="./assets/images/original-8ca4f930612e89ba102ea0ae1b9490c4.com"
                    alt=""
                  />
                  <div className="job-title-company-container">
                    <div style={{ display: "flex" }}>
                      <p className="job-role" style={{ marginTop: "4px" }}>
                        FreeRoyalties
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        role="img"
                        class="icon "
                        style={{
                          marginLeft: "8px",
                          padding: "2px",
                          borderRadius: "9999999px",
                          backgroundColor: "#b8509a",
                          color: "#fff",
                        }}
                      >
                        <path
                          d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.56756 13.4925C3.56524 13.6461 3.63372 13.7923 3.75324 13.8889C3.89073 14 4.16316 14 4.70802 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1092 10 19.8368 10 19.292 10H12L13 2Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <h2 className="job-title">
                      Web Designer for Healthcare Tech Company
                      SSSSSSSSSSSSSSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </h2>
                    <div
                      className="job-details--mobile"
                      style={{ color: "#6e6d7a" }}
                    >
                      Remote
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{ display: "none" }}
                    className="job-additional-details-container"
                  >
                    <a className="btn-button" href="">
                      View job
                    </a>
                    <a className="btn-button" href="">
                      Apply now
                    </a>
                  </div>
                  <div className="job-details">
                    <span className="featured-badge"> Featured </span>
                    <div className="location-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        role="img"
                      >
                        <path
                          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span className="location">Remote</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="job-list-item">
                <a href=""></a>
                <div className="job-details-container">
                  <img
                    src="./assets/images/original-8ca4f930612e89ba102ea0ae1b9490c4.com"
                    alt=""
                  />
                  <div className="job-title-company-container">
                    <p className="job-role">FreeRoyalties</p>
                    <h2 className="job-title">
                      Web Designer for Healthcare Tech Company
                      SSSSSSSSSSSSSSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </h2>
                    <div className="job-details--mobile">
                      <span style={{ color: "color: #3d3d4e;" }}>Brazil</span>
                      <span style={{ color: "#6e6d7a" }}>Remote</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{ display: "none" }}
                    className="job-additional-details-container"
                  >
                    <a className="btn-button" href="">
                      View job
                    </a>
                    <a className="btn-button" href="">
                      Apply now
                    </a>
                  </div>
                  <div className="job-details">
                    <div className="posted-on">Posted about 9 hours ago</div>
                    <div className="location-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        role="img"
                      >
                        <path
                          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span className="location">Brazil</span>
                    </div>
                    {/* <div className="posted-on">Remote Friendly</div> */}
                  </div>
                </div>
              </li>
            </ol>
            <div className="page">
              <a href="" className="btn2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </a>
            </div>
          </div>
          <div
            className="search-filters-container"
            style={showFilters ? { display: "block" } : {}}
          >
            <div className="search-filters">
              <form action="">
                <label htmlFor="skills">Specialties</label>
                <div className="checkbox-radio-group">
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Animation
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Brand / Graphic Design
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Illustration
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Leadership
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Mobile Design
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    UI / Visual Design
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Product Design
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    UX Design / Research
                  </div>
                  <div className="checkbox-radio">
                    <input type="checkbox" />
                    Web Design
                  </div>
                </div>
                <div className="divider"></div>
                <label htmlFor="location">Location</label>
                <input type="text" placeholder="Enter Location…" />
                <div style={{ margin: "16px 0" }} className="checkbox-radio">
                  <input type="checkbox" />
                  Open to remote
                </div>
                <div className="divider"></div>
                <div style={{ margin: "16px 0" }} className="checkbox-radio">
                  <input type="checkbox" />
                  Full-Time
                </div>
                <div style={{ margin: "16px 0" }} className="checkbox-radio">
                  <input type="checkbox" />
                  Freelance/Contract
                </div>
                <div className="submit-container">
                  <input type="submit" value="Filter" />
                  <a style={{ display: "none" }} href="">
                    Clear Filters
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Jobs;
