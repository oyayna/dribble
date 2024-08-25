import React, { useEffect, useRef } from "react";

const images = [
  {
    src: `${process.env.PUBLIC_URL}/assets/images/mercedes-bazan.png`,
    name: "Mercedes Bazan",
    title: "Illustrator",
    tags: ["Graphic Design", "Illustration"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/cd3266dde4f00a5d6a509c7375ddaecd.png`,
    name: "Aurélien Salomon",
    title: "Design Director",
    tags: ["Mobile", "Product", "UX"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/3986915be548424a5d36657f2b034ead.jpeg`,
    name: "Chris Owens",
    title: "Creative Director",
    tags: ["Illustration", "Mobile", "UI"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/4f02d72fe701b15b2168a4954332427f.png`,
    name: "Lilla Bardenova",
    title: "Brand + Illustrator",
    tags: ["Brand", "Illustration", "Web"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/d85ae8c7db2421e9a01ecac942978d4b.png`,
    name: "Andrea Jelić",
    title: "Digital Designer",
    tags: ["Brand", "UI", "Web"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/1fb34610061a95a007ac5e7b1dc53138.jpeg`,
    name: "Victa Wille",
    title: "Digital Designer",
    tags: ["Mobile", "UI", "Web"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/9b22cd83bde1809976bec0722d1f8923.jpeg`,
    name: "Elif Kameşoğlu",
    title: "Brand Designer",
    tags: ["Brand", "Illustration", "Web"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/daniele-buffa-3.png`,
    name: "Daniele Buffa",
    title: "Principal Designer",
    tags: ["Animation", "UI", "Visual"],
  },
  {
    src: `${process.env.PUBLIC_URL}/assets/images/Vladimir_Gruev.png`,
    name: "Vladimir Gruev",
    title: "Digital Designer",
    tags: ["Brand", "Design"],
  },
];

const HeroMarquee = () => {
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
    <div className="hero-marquee">
      <div className="hero-marquee__track no-select" ref={marqueeTrackRef}>
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.src} alt={image.name} />
            <div className="Item1">{image.name}</div>
            <div className="Item2">{image.title}</div>
            <ul className="Item3">
              {image.tags.map((tag, tagIndex) => (
                <li key={tagIndex}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroMarquee;
