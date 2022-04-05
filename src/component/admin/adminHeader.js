import React from "react";
import { Link } from "react-router-dom";
import style from "../../adminResource/css/ruang-admin.css";
import "../../adminResource/css/ruang-admin.min.css";
import { CustomDataTable } from "./customDataTable/datatable";
// import "../../adminResource/js/ruang-admin";
// import "../../adminResource/js/ruang-admin.min.js";

export default function AdminHeader(props) {
  //   const navigate = useNavigate();

  //   var isAuth = GetAuthDetail();

  //   const checkIsAdminUser = async () => {
  //     /* Check Whether the curret logged in user is and admin user or not  */

  //     if (isAuth) {
  //       const userApiResponse = await FetchUserProfileApi();

  //       if (userApiResponse.status) {
  //         console.log(userApiResponse.data.is_staff);
  //         if (userApiResponse.data.is_staff === true) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   };

  //   const GetAllUserApi = () => {};

  //   React.useEffect(async () => {
  //     const validate = await checkIsAdminUser();
  //     if (validate) {
  //     } else {
  //       navigate("/");
  //     }
  //   }, []);

  const componentToLoad = props.component;

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul
        className="navbar-nav sidebar sidebar-light accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon">
            {/* <img src="img/logo/logo2.png" /> */}
            <span class="text-primary font-weight-bold border px-3 mr-1">
              E
            </span>
          </div>

          <div className="sidebar-brand-text mx-3">Shopper</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/admin/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Features</div>
        <li className="nav-item">
          <Link className="nav-link " to="/admin/user">
            <i className="far fa-fw fa-window-maximize" />
            <span>Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            to="/admin/products"
            data-toggle="collapse"
            data-target="#collapseForm"
            aria-expanded="true"
            aria-controls="collapseForm"
          >
            <i className="fab fa-fw fa-wpforms" />
            <span>Products</span>
          </a>
          <div
            id="collapseForm"
            className="collapse"
            aria-labelledby="headingForm"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Menus</h6>
              <Link to="/admin/product" className="collapse-item">
                Products
              </Link>
              <Link to="/admin/product_category" className="collapse-item">
                Products Category
              </Link>
              <Link to="/admin/product_images" className="collapse-item">
                Product Images
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="/admin/orders"
            data-toggle="collapse"
            data-target="#collapseTable"
            aria-expanded="true"
            aria-controls="collapseTable"
          >
            <i className="fas fa-fw fa-table" />
            <span>Orders</span>
          </Link>
          <div
            id="collapseTable"
            className="collapse"
            aria-labelledby="headingTable"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Orders</h6>
              <Link to={"/admin/orders"} className="collapse-item">
                Orders
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="ui-colors.html">
            <i className="fas fa-fw fa-palette" />
            <span>UI Colors</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Examples</div>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePage"
            aria-expanded="true"
            aria-controls="collapsePage"
          >
            <i className="fas fa-fw fa-columns" />
            <span>Pages</span>
          </a>
          <div
            id="collapsePage"
            className="collapse"
            aria-labelledby="headingPage"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Example Pages</h6>
              <a className="collapse-item" href="login.html">
                Login
              </a>
              <a className="collapse-item" href="register.html">
                Register
              </a>
              <a className="collapse-item" href="404.html">
                404 Page
              </a>
              <a className="collapse-item" href="blank.html">
                Blank Page
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="version" id="version-ruangadmin" />
      </ul>
      {/* Sidebar */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* TopBar */}
          <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button
              id="sidebarToggleTop"
              className="btn btn-link-admin rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link "
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-search fa-fw" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form className="navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-1 small"
                        placeholder="What do you want to look for?"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={{ borderColor: "#3f51b5" }}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary-admin" type="button">
                          <i className="fas fa-search fa-sm" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link "
                  href="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell fa-fw" />
                  <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <div
                  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="alertsDropdown"
                >
                  <h6 className="dropdown-header">Alerts Center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="mr-3">
                      <div className="icon-circle bg-primary">
                        <i className="fas fa-file-alt text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="small text-gray-500">
                        December 12, 2019
                      </div>
                      <span className="font-weight-bold">
                        A new monthly report is ready to download!
                      </span>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="mr-3">
                      <div className="icon-circle bg-success">
                        <i className="fas fa-donate text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="small text-gray-500">
                        December 7, 2019
                      </div>
                      $290.29 has been deposited into your account!
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="mr-3">
                      <div className="icon-circle bg-warning">
                        <i className="fas fa-exclamation-triangle text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="small text-gray-500">
                        December 2, 2019
                      </div>
                      Spending Alert: We've noticed unusually high spending for
                      your account.
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Show All Alerts
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link "
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-envelope fa-fw" />
                  <span className="badge badge-warning badge-counter">2</span>
                </a>
                <div
                  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="messagesDropdown"
                >
                  <h6 className="dropdown-header">Message Center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image mr-3">
                      <img
                        className="rounded-circle"
                        src="img/man.png"
                        style={{ maxWidth: 60 }}
                        alt
                      />
                      <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                      <div className="text-truncate">
                        Hi there! I am wondering if you can help me with a
                        problem I've been having.
                      </div>
                      <div className="small text-gray-500">
                        Udin Cilok · 58m
                      </div>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image mr-3">
                      <img
                        className="rounded-circle"
                        src="img/girl.png"
                        style={{ maxWidth: 60 }}
                        alt
                      />
                      <div className="status-indicator bg-default" />
                    </div>
                    <div>
                      <div className="text-truncate">
                        Am I a good boy? The reason I ask is because someone
                        told me that people say this to all dogs, even if they
                        aren't good...
                      </div>
                      <div className="small text-gray-500">Jaenab · 2w</div>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Read More Messages
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link "
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-tasks fa-fw" />
                  <span className="badge badge-success badge-counter">3</span>
                </a>
                <div
                  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="messagesDropdown"
                >
                  <h6 className="dropdown-header">Task</h6>
                  <a className="dropdown-item align-items-center" href="#">
                    <div className="mb-3">
                      <div className="small text-gray-500">
                        Design Button
                        <div className="small float-right">
                          <b>50%</b>
                        </div>
                      </div>
                      <div className="progress" style={{ height: 12 }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item align-items-center" href="#">
                    <div className="mb-3">
                      <div className="small text-gray-500">
                        Make Beautiful Transitions
                        <div className="small float-right">
                          <b>30%</b>
                        </div>
                      </div>
                      <div className="progress" style={{ height: 12 }}>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "30%" }}
                          aria-valuenow={30}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item align-items-center" href="#">
                    <div className="mb-3">
                      <div className="small text-gray-500">
                        Create Pie Chart
                        <div className="small float-right">
                          <b>75%</b>
                        </div>
                      </div>
                      <div className="progress" style={{ height: 12 }}>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    View All Taks
                  </a>
                </div>
              </li>
              <div className="topbar-divider d-none d-sm-block" />
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link "
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="img-profile rounded-circle"
                    src="img/boy.png"
                    style={{ maxWidth: 60 }}
                  />
                  <span className="ml-2 d-none d-lg-inline text-white small">
                    Maman Ketoprak
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                    Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                    Activity Log
                  </a>
                  <div className="dropdown-divider" />
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          {/* Topbar */}
          {/* Container Fluid*/}
          <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">
                {props.title ? props.title : "Page"}
              </h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="./">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </div>

            {componentToLoad()}

            {/*Row*/}

            {/* Modal Logout */}
            <div
              className="modal fade"
              id="logoutModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabelLogout"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabelLogout">
                      Ohh No!
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to logout?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <a href="login.html" className="btn btn-primary-admin">
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*-Container Fluid*/}
        </div>
      </div>
    </div>
  );
}
