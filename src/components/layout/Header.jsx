import React from "react";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    logout();
    navigate(0);
  };
  return (
    <div className="main-header">
      <div className="main-header-logo">
        {/* <!-- Logo Header --> */}
        <div className="logo-header test" data-background-color="dark">
          <Link to="#" className="logo">
            <img
              src="/assets/img/logo.png"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
        {/* <!-- End Logo Header --> */}
      </div>
      {/* <!-- Navbar Header --> */}
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          {/* <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="fa fa-search search-icon"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div>
          </nav> */}

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <i className="fa fa-search"></i>
              </Link>
              <ul className="dropdown-menu dropdown-search animated fadeIn">
                <form className="navbar-left navbar-form nav-search">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className="form-control"
                    />
                  </div>
                </form>
              </ul>
            </li>
            {/* <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="messageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-envelope"></i>
              </Link>
              <ul
                className="dropdown-menu messages-notif-box animated fadeIn"
                aria-labelledby="messageDropdown"
              >
                <li>
                  <div className="dropdown-title d-flex justify-content-between align-items-center">
                    Messages
                    <Link to="#" className="small">
                      Mark all as read
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="message-notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="/assets/img/jm_denis.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jimmy Denis</span>
                          <span className="block"> How are you ? </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="/assets/img/chadengle.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Chad</span>
                          <span className="block"> Ok, Thanks ! </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img src="/assets/img/mlane.jpg" alt="Img Profile" />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jhon Doe</span>
                          <span className="block">
                            Ready for the meeting today...
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img src="/assets/img/talha.jpg" alt="Img Profile" />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Talha</span>
                          <span className="block"> Hi, Apa Kabar ? </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="see-all" to="javascript:void(0);">
                    See all messages<i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="notifDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell"></i>
                <span className="notification">4</span>
              </Link>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have 4 new notification
                  </div>
                </li>
                <li>
                  <div className="notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <Link to="#">
                        <div className="notif-icon notif-primary">
                          <i className="fa fa-user-plus"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> New user registered </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-icon notif-success">
                          <i className="fa fa-comment"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="/assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-icon notif-danger">
                          <i className="fa fa-heart"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> Farrah liked Admin </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="see-all" to="javascript:void(0);">
                    See all notifications<i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                to="#"
                aria-expanded="false"
              >
                <i className="fas fa-layer-group"></i>
              </Link>
              <div className="dropdown-menu quick-actions animated fadeIn">
                <div className="quick-actions-header">
                  <span className="title mb-1">Quick Actions</span>
                  <span className="subtitle op-7">Shortcuts</span>
                </div>
                <div className="quick-actions-scroll scrollbar-outer">
                  <div className="quick-actions-items">
                    <div className="row m-0">
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-danger rounded-circle">
                            <i className="far fa-calendar-alt"></i>
                          </div>
                          <span className="text">Calendar</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-warning rounded-circle">
                            <i className="fas fa-map"></i>
                          </div>
                          <span className="text">Maps</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-info rounded-circle">
                            <i className="fas fa-file-excel"></i>
                          </div>
                          <span className="text">Reports</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-success rounded-circle">
                            <i className="fas fa-envelope"></i>
                          </div>
                          <span className="text">Emails</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-primary rounded-circle">
                            <i className="fas fa-file-invoice-dollar"></i>
                          </div>
                          <span className="text">Invoice</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-secondary rounded-circle">
                            <i className="fas fa-credit-card"></i>
                          </div>
                          <span className="text">Payments</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}
            {user ? (
              <li className="nav-item topbar-user dropdown hidden-caret">
                <Link
                  className="dropdown-toggle profile-pic"
                  data-bs-toggle="dropdown"
                  to="#"
                  aria-expanded="false"
                >
                  <div className="avatar-sm">
                    <img
                      src={
                        user?.avatar
                          ? user?.avatar?.url
                          : "/assets/img/profile.jpg"
                      }
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <span className="profile-username">
                    <span className="op-7">Hi,</span>
                    <span className="fw-bold">{user?.name}</span>
                  </span>
                </Link>

                <ul className="dropdown-menu dropdown-user animated fadeIn">
                  <div className="dropdown-user-scroll scrollbar-outer">
                    <li>
                      <div className="user-box">
                        <div className="avatar-lg">
                          <img
                            src={
                              user?.avatar
                                ? user?.avatar?.url
                                : "/assets/img/profile.jpg"
                            }
                            alt="image profile"
                            className="avatar-img rounded"
                          />
                        </div>
                        <div className="u-text">
                          <h4>{user?.name}</h4>
                          <p className="text-muted">{user?.email}</p>
                          <Link
                            to="/me/profile"
                            className="btn btn-xs btn-secondary btn-sm"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/me/profile">
                        My Profile
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item"
                        to="/admin/login"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </li>
                  </div>
                </ul>
              </li>
            ) : (
              !isLoading && (
                <Link
                  to="/admin/login"
                  className="btn btn-xs btn-secondary btn-sm"
                >
                  LOGIN
                </Link>
              )
            )}
          </ul>
        </div>
      </nav>
      {/* <!-- End Navbar --> */}
    </div>
  );
};

export default Header;
