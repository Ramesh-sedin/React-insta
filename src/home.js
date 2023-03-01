import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "./img/user.png";
import "./home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import firebase from "firebase/compat/app";
import { auth } from "./firebase";
export const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
  const [User, setUser] = useState(null);
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  fetch("http://localhost:8001/images")
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      setPictures(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
  useEffect(() => {
    const validateEmail = sessionStorage.getItem("username");
    if (validateEmail == "" || validateEmail == null) {
      navigate("../login");
    }
  }, []);
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((ress) => {
        navigate("../login");
      });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="sidebar">
              <h2 className="title sidebar-title">Instagram</h2>
              <div className="sidebar-content">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-home" aria-hidden="true"></i>Home
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-search" aria-hidden="true"></i>Search
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-compass" aria-hidden="true"></i>
                      Explore
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-video-camera" aria-hidden="true"></i>
                      Reels
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-comment-o" aria-hidden="true"></i>
                      Messages
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                      Notifications
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                      Create
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                      Profile
                    </a>
                  </li>
                </ul>
                <a href="#" className="end-link">
                  <i className="fa fa-bars" aria-hidden="true"></i> More
                </a>
                <div>
                  <a href="#" className="logout" onClick={logout}>
                    <i className="fa fa-bars" aria-hidden="true"></i> More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="feed-section">
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
                {pictures.map((result) => (
                  <img
                    src={JSON.stringify(result.thumbnailUrl).replace(
                      /^["'](.+(?=["']$))["']$/,
                      "$1"
                    )}
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="col-md-3">
            <div className="other-info">
              <div className="my-profile">
                <div>
                  <img className="profile-image" src={user} alt="user_image" />
                </div>
                <div className="profile-name">
                  <p>Ramesh_1995</p>
                  <span>Ramesh</span>
                </div>
                <div className="switch-acc">
                  <a href="#">Switch</a>
                </div>
              </div>
              <div className="suggestions d-flex justify-content-between">
                <p>Suggestions for you</p>
                <a href="#">See all</a>
              </div>
              <div className="my-profile">
                <div>
                  <img className="profile-image" src={user} alt="user_image" />
                </div>
                <div className="profile-name">
                  <p>Indian cricket </p>
                  <span>india</span>
                </div>
                <div className="switch-acc">
                  <a href="#">Follow</a>
                </div>
              </div>
              <div className="my-profile">
                <div>
                  <img className="profile-image" src={user} alt="user_image" />
                </div>
                <div className="profile-name">
                  <p>Tamil Industry </p>
                  <span>Tamil</span>
                </div>
                <div className="switch-acc">
                  <a href="#">Follow</a>
                </div>
              </div>
              <div className="my-profile">
                <div>
                  <img className="profile-image" src={user} alt="user_image" />
                </div>
                <div className="profile-name">
                  <p>RCB </p>
                  <span>IPL</span>
                </div>
                <div className="switch-acc">
                  <a href="#">Follow</a>
                </div>
              </div>
            </div>
            <div className="other-links">
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Location</a>
                </li>
                <li>
                  <a href="#">Language</a>
                </li>
              </ul>
            </div>
            <p className="copyrights">© 2023 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  );
};
