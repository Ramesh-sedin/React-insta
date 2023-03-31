import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
export const UserStory = () => {
  const [pictures, setPictures] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    fetch("http://localhost:2002/images")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setPictures(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <Carousel
        className="status-slider"
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={500}
        slidesToSlide={3}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={""}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {pictures.map((result, i) => (
          <img
            key={i}
            src={JSON.stringify(result.thumbnailUrl).replace(
              /^["'](.+(?=["']$))["']$/,
              "$1"
            )}
          />
        ))}
      </Carousel>
    </>
  );
};
