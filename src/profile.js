import { RightPane } from "./rightPane";
import { SideBar } from "./sidebar";

export const Profile = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-7"></div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};
