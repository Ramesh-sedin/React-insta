export const RightPane = ({ photoURL, proPic, user }) => {
  return (
    <>
      <div className="other-info">
        <div className="my-profile">
          <div>
            <img className="profile-image" src={photoURL} alt="user_image" />
          </div>
          <div className="profile-name">
            <p>{user.displayName}</p>
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
            <img className="profile-image" src={proPic} alt="user_image" />
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
            <img className="profile-image" src={proPic} alt="user_image" />
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
            <img className="profile-image" src={proPic} alt="user_image" />
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
    </>
  );
};
