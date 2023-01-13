import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../src/launchPage.css";
import slider1 from "./img/slider1.png";
import slider2 from "./img/slider2.png";
import slider3 from "./img/slider3.png";
export const Slider = () => {
  return (
    <div className="slider">
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={slider1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
