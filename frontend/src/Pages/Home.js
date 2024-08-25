import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import AuthContext from "../Authentication/AuthContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroMarquee from "../Components/HeroMarquee";
import FooterMarquee from "../Components/FooterMarquee";
import Filters from "../Components/Filters";
import "../assets/css/home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      id="wrap"
      style={!user ? { backgroundColor: "rgb(248, 247, 244)" } : {}}
    >
      <Navbar />
      {!user ? (
        <>
          <main>
            <section className="hero">
              <div className="home-container">
                <div className="home-badge home-badge--color-cycle">
                  <a href=""> Over 3 million ready-to-work creatives! </a>
                </div>
                <h1 className="hero__heading">
                  The world’s destination for design
                </h1>
                <div className="home-type-body-large">
                  Get inspired by the work of millions of top-rated designers &
                  agencies around the world.
                </div>
                <div className="handle-button">
                  <a className="a-button btn2" href="">
                    Get started
                  </a>
                </div>
              </div>
              <HeroMarquee />
            </section>
            <section className="home-feed">
              <h2 className="home-feed__heading">Explore inspiring designs</h2>
              <div className="container-ml">
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
                                  d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </a>
                          </li>
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
                      <li>
                        <ul className="contentv2">
                          <li>
                            <a href="">
                              <img
                                width="25px"
                                height="25px"
                                className="display-image"
                                src="./assets/images/3c467725100c037f0781f583af65a2dd.jpg"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a className="display-name" href="">
                              Ben Didier
                            </a>
                          </li>
                          <li>
                            <a className="badge-pro" href="">
                              pro
                            </a>
                          </li>
                        </ul>
                      </li>
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
                                  d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                <div id="buttont">
                  <a className="btn-button btn2" href="">
                    Browse more inspiration
                  </a>
                </div>
                <div className="back-to-top">
                  <a href="#" className="btn2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
            <section className="footer-cta">
              <div className="footer-cta__content">
                <h2 className="footer-cta__heading">
                  Find your next designer today
                </h2>
                <div className="footer-cta__copy">
                  The world’s leading brands use Dribbble to hire creative
                  talent. Browse millions of top-rated portfolios to find your
                  perfect creative match.
                </div>
                <div className="flex">
                  <a href="" className="footer-cta-button1 btn2">
                    Get started now
                  </a>
                  <a href="" className="footer-cta-button2 btn2">
                    Learn about hiring
                  </a>
                </div>
                <div className="footer-cta__copy">
                  Are you a designer?
                  <a href="">Join Dribbble</a>
                </div>
              </div>
            </section>
          </main>
          <FooterMarquee />
        </>
      ) : (
        <>
          <div className="notice">
            <h2>
              Verify your email to get the most out of Dribbble. Didn't receive
              an email? <a href="">Resend confirmation</a>
            </h2>
          </div>

          {/* <div className="search-header2">
        <div className="search-landing-header-container">
          <div className="search-image-container">
            <img
              src="./assets/images/search-header-400-41ed4aef30687e1fcce83d1b2fd5d443323de5e006.png"
              alt=""
            />
            <p className="search-landing-image-attribution">
              Art by
              <a href="">SAM JI</a>
            </p>
          </div>
          <div className="search-landing-image-text">
            <h1 className="search-landing-heading">Search Dribbble</h1>
            <p className="search-landing-heading-text">
              24,200,000+ images from thousands of inspirational designers
            </p>
          </div>
        </div>
        <div className="search-results-details">
          <div className="search-input-container">
            <div className="search-input-with-dropdown">
              <div className="left-side-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  role="img"
                  className="icon fill-current search-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                  ></path>
                </svg>
                <form
                  action=""
                  method="get"
                  style="position: absolute; inset: 0"
                >
                  <input type="text" placeholder="Search..." />
                </form>
              </div>
              <div className="vertical-divider"></div>
              <div className="btn-dropdown">
                <a href="" className="btn-dropdown-link">
                  Shots
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                </a>
              </div>
              <div className="btn-dropdown-options">
                <ul style="padding: 12px">
                  <li className="active">
                    <a href="">
                      Shots
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Members
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Teams
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="search-results-suggestions">
            <li className="search-results-suggestion search-results-suggestion-heading">
              Suggested :
            </li>
            <li className="search-results-suggestion">
              <a href="">landing page</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">ios</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">food</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">landingpage</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">uxdesign</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">app design</a>
            </li>
          </ul>
        </div>
          </div> */}

          {/* <div className="search-header">
        <div className="background-bar"></div>
        <div className="search-results-details">
          <div className="search-input-container">
            <div className="search-input-with-dropdown">
              <div className="left-side-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  role="img"
                  className="icon fill-current search-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                  ></path>
                </svg>
                <form
                  action=""
                  method="get"
                  style="position: absolute; inset: 0"
                >
                  <input type="text" placeholder="Search..." />
                </form>
              </div>
              <div className="vertical-divider"></div>
              <div className="btn-dropdown">
                <a href="" className="btn-dropdown-link">
                  Shots
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                </a>
              </div>
              <div className="btn-dropdown-options">
                <ul style="padding: 12px">
                  <li className="active">
                    <a href="">
                      Shots
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Members
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Teams
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h1 className="search-results-heading">h</h1>
          <p className="search-results-description">
            Outstanding h designs for inspiration
          </p>
          <ul className="search-results-suggestions">
            <li className="search-results-suggestion search-results-suggestion-heading">
              Related :
            </li>
            <li className="search-results-suggestion">
              <a href="">c</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">letter</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">hh</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">alphabet</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">monogram</a>
            </li>
            <li className="search-results-suggestion">
              <a href="">b</a>
            </li>
          </ul>
        </div>
          </div> */}

          {/* <div className="signed-out-hero">
        <div className="hero-text-content">
          <h1>Discover the world’s top designers & creatives</h1>
          <h2>
            Dribbble is the leading destination to find & showcase creative work
            and home to the world's best design professionals.
          </h2>
        </div>
        <div className="search-input-hero">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            role="img"
            className="icon fill-current search-icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
            ></path>
          </svg>
          <form action="" method="get">
            <input type="text" placeholder="Search 18 million+ shots..." />
          </form>
        </div>
        <ul className="search-suggestions-hero">
          <li className="search-results-suggestion search-results-suggestion-heading">
            Trending searches
          </li>
          <li className="search-results-suggestion">
            <a href="">landing page</a>
          </li>
          <li className="search-results-suggestion">
            <a href="">ios</a>
          </li>
          <li className="search-results-suggestion">
            <a href="">food</a>
          </li>
          <li className="search-results-suggestion">
            <a href="">landingpage</a>
          </li>
          <li className="search-results-suggestion">
            <a href="">uxdesign</a>
          </li>
          <li className="search-results-suggestion">
            <a href="">app design</a>
          </li>
        </ul>
          </div> */}

          <Filters />
          <div className="home-feed">
            <div className="container-ml">
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
                                d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </li>
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
                    <li>
                      <ul className="contentv2">
                        <li>
                          <a href="">
                            <img
                              width="25px"
                              height="25px"
                              className="display-image"
                              src="./assets/images/3c467725100c037f0781f583af65a2dd.jpg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a className="display-name" href="">
                            Ben Didier
                          </a>
                        </li>
                        <li>
                          <a className="badge-pro" href="">
                            pro
                          </a>
                        </li>
                      </ul>
                    </li>
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
                                d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
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
              <div id="buttontV2">
                <a className="btn-buttonV2 btn2" href="">
                  Load more work
                </a>
              </div>
              <div className="back-to-top">
                <a href="#" className="btn2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
