import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  Home,
  PlayCircleFilledOutlined,
  Group,
  Storefront,
  HelpOutline,
  Event,
  Person,
  
} from "@material-ui/icons";
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none" }}>
            <span className="sidebarListItemText">Home</span>
            </Link>

          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Storefront className="sidebarIcon" />
            <span className="sidebarListItemText">Market Place</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
        </ul>
        {/* <hr className="sidebarHr" /> */}
      </div>
    </div>
  );
}
