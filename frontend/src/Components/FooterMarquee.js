import React, { useEffect, useRef } from "react";
import "../assets/css/footer.css";

const images = [
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-1fc733080e35f1d388c2a10ec7f803e1.jpg`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-2edc1c941fb5746fabcd90c319282db0 (2).jpg`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-5bcba409eba506f07eb906b0dc2a5f9e (1).png`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-5dbb102f5b279aacd0ecaa7049137991 (2).png`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-9d4b40d9e9a4569e814e8df4650ff980.png`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-79e26044bc474333b3ab7d0d9b64169f (1).png`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-616b683a10b7f0c811bda51d4c2da5a3.jpg`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-97566eae598863e93c855acf289cd3d0 (1).png`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-b56f7c0e276b2bd0e52b3c95a67c69ad (1).jpg`,
    name: "Mercedes Bazan",
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/original-e012964527338a775c49caf103146848 (1).jpg`,
    name: "Mercedes Bazan",
  },
];

const FooterMarquee = () => {
  const marqueeTrackRef = useRef(null);
  const clonedRef = useRef(false);

  useEffect(() => {
    if (marqueeTrackRef.current && !clonedRef.current) {
      const clone = marqueeTrackRef.current.cloneNode(true);
      marqueeTrackRef.current.parentNode.appendChild(clone);
      clonedRef.current = true;
    }
  }, []);

  return (
    <footer className="footer-v1-marquee">
      <div className="footer-v1-marquee__track" ref={marqueeTrackRef}>
        {images.map((image, index) => (
          <a href="#" className="image-container" key={index}>
            <div className="footer-v1-marquee-item__stack"></div>
            <div className="no-select">
              <img src={image.src} alt={image.name} />
            </div>
            <div className="Item4">{image.name}</div>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default FooterMarquee;
