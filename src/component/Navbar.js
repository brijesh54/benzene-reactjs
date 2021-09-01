import React from 'react'
import { Dropdown } from 'react-bootstrap';
import Config from '../utils/Config';
import logo from '../assets/images/logonew.svg';
import miniLogo from '../assets/images/logo-mini.svg'
import face1 from '../assets/images/faces/face1.jpg'
import face2 from '../assets/images/faces/face2.jpg'
import face3 from '../assets/images/faces/face3.jpg'
import face4 from '../assets/images/faces/face4.jpg'

class Navbar extends React.Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  constructor(props) {
    super(props);
    this.divref2 = React.createRef();
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleMouseClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMouseClick, false);
  }

  handleMouseClick = (event) => {
    if (
      event.target === this.divref2.current
    ) {
      console.log("Click Element");
      return;
    } else {
      console.log("Click Outside");
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };
  render() {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="index.html"><img src={logo} alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="index.html"><img src={miniLogo} alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link" variant="" aria-controls="example-collapse-text">
                  <div className="nav-profile-img">
                    <img src={face1} alt="user" />
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black"><span>Brijesh Vasoya</span></p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item href={Config.logoutPageUrl} ref={this.divref2}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <span style={{color: 'black'}}>Signout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator" variant="">
                  <i className="mdi mdi-email-outline"></i>
                  <span className="count-symbol bg-warning"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 mb-0"><span>Messages</span></h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={face4} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><span>Mark send you a message</span></h6>
                      <p className="text-gray mb-0">
                        1 <span>Minutes ago</span>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={face2} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><span>Cregh send you a message</span></h6>
                      <p className="text-gray mb-0">
                        15 <span>Minutes ago</span>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={face3} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><span>Profile picture updated</span></h6>
                      <p className="text-gray mb-0">
                        18 <span>Minutes ago</span>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">4 <span>new messages</span></h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator" variant="">
                  <i className="mdi mdi-bell-outline"></i>
                  <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0"><span>Notifications</span></h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-calendar"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><span>Event today</span></h6>
                      <p className="text-gray ellipsis mb-0">
                      <span>Just a reminder that you have an event today</span>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-settings"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><span>Settings</span></h6>
                      <p className="text-gray ellipsis mb-0">
                      <span>Update dashboard</span>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-link-variant"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><span>Launch Admin</span></h6>
                      <p className="text-gray ellipsis mb-0">
                      <span>New admin wow</span>!
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer"><span>See all notifications</span></h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas} data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    )
  }
}

export default Navbar
