import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-y">
        <h2 className="text-center fw-bolder">User settings</h2>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <SideMenu />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
