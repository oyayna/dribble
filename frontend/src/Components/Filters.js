import React, { useRef, useState, useEffect } from "react";

const Filters = () => {
  const categoriesRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const checkScrollPosition = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (categoriesRef.current) {
      categoriesRef.current.addEventListener("scroll", checkScrollPosition);
    }
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (categoriesRef.current) {
        categoriesRef.current.removeEventListener(
          "scroll",
          checkScrollPosition
        );
      }
      window.removeEventListener("resize", checkScrollPosition);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div
        className="filter-subnav"
        style={showFilters ? { marginBottom: "0" } : {}}
      >
        <div className="filter-subnav-inner">
          <div className="filter-views">
            <div className="btn-dropdown" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="nav-btn btn2"
              >
                <span>Following</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  className="icon btn-dropdown-caret"
                >
                  <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                </svg>
              </button>
              {showDropdown && (
                <ul>
                  <li className="active">
                    <a href="">Following</a>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                  </li>
                  <li className="popular">
                    <a href="">Popular</a>
                  </li>
                  <li className="recent-btn">
                    <a href="">New & Noteworthy</a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="filter-categories">
            {showLeftButton && (
              <button onClick={scrollLeft} id="button-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  className="button-left"
                >
                  <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                </svg>
              </button>
            )}

            <ul ref={categoriesRef}>
              <li className="active">
                <a href="">Discover</a>
              </li>
              <li>
                <a href="">Animation</a>
              </li>
              <li>
                <a href="">Branding</a>
              </li>
              <li>
                <a href="">Illustration</a>
              </li>
              <li>
                <a href="">Mobile</a>
              </li>
              <li>
                <a href="">Print</a>
              </li>
              <li>
                <a href="">Product Design</a>
              </li>
              <li>
                <a href="">Typography</a>
              </li>
              <li>
                <a href="">Web Design</a>
              </li>
            </ul>

            {showRightButton && (
              <button onClick={scrollRight} id="button-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  className="button-right"
                >
                  <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="filter-settings">
            <button
              onClick={handleToggleFilters}
              id="nav-btn-v2"
              className="btn2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                className="icon filter-icon icon-14"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"
                ></path>
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div
          className="shot-filters"
          style={
            showFilters
              ? {
                  visibility: "visible",
                  opacity: "1",
                  transform: "translateY(0px)",
                  marginBottom: "60px",
                }
              : {}
          }
        >
          <form action="" className="gen-form shot-filters-form" method="get">
            <div>
              <label htmlFor="">Tags</label>
              <div className="input-with-icon">
                <input type="search" name="tag" id="tag" />
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="">Color</label>
              <div className="input-with-icon">
                <input
                  type="search"
                  name="tag"
                  id="tag"
                  placeholder="Enter hex or select"
                />
                <span>
                  <img src="./assets/SVG/image (7).svg" alt="" />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filters;
