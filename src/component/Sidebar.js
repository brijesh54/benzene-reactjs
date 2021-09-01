import React from 'react'
import Config from '../utils/Config'
import face1 from '../assets/images/faces/face1.jpg'

class Sidebar extends React.Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                                <img src={face1} alt="profile" />
                                <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2">Brijesh Vasoya</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    {Config.sidebarItem.map(
                        (item) =>
                            <li className={`${item.index==this.props.activepage ? "active": " "} nav-item`}>
                                <a className="nav-link" href={item.url}>
                                    <span className="menu-title">{item.title}</span>
                                    <i className={`${item.icons} menu-icon`}></i>
                                </a>
                            </li>
                    )}
                </ul>
            </nav>
        )
    }
}

export default Sidebar
