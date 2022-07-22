import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Menu,
  Close,
  ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";
import Sidebar from "../sidebar/Sidebar";
import Searchbar from "../searchBar/Searchbar";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleClick = () => {
    logoutCall(dispatch);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft navbar">
        <div className="menu-bars">
          {/* <span> */}
          <Link to="#" className="menu-bars">
            <Menu onClick={showSidebar} />
          </Link>
          {/* </span> */}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-itmes">
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars x">
                <Close className="close" />
              </Link>
            </li>
            <Sidebar />
          </ul>
        </nav>

        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            {/* <span> */}
            RAVE UP
            {/* </span> */}
          </Link>
        </div>
      </div>


      <div className="topbarCenter">
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search..." className="searchInput" />
        </div> */}
          <Searchbar />
      </div>


      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem" id="person">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem" id="chat">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem" id="notif">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarEnd">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.jpeg"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <div className="topbarLink">
            <Link to="/login" style={{ textDecoration: "none" }}>
              {/* <button className="topbarLink" onClick={handleClick}>Log out</button> */}
              <ExitToApp onClick={handleClick} />
            </Link>
          </div>
        </div>
      </div> 
    </div>
  );
}
