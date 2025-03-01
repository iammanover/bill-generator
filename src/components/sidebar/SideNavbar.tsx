import ReceiptIcon from "@mui/icons-material/Receipt";
import ListIcon from "@mui/icons-material/List";
import { NavLink } from "react-router-dom";
import "./SideNavbar.scss";

const sideBarList = [
  {
    id: 1,
    icon: ListIcon,
    name: "Customers List",
    route: "/customer-list",
  },
  {
    id: 2,
    icon: ReceiptIcon,
    name: "Bill Generator",
    route: "/bill-generator",
  },
];

const SideNavbar = () => {
  return (
    <div className="sideNavbar d-flex flex-column align-items-center min-vh-100 pt-5">
      <ul className="sidebar-menu position-fixed">
        {sideBarList.map((items) => {
          const Icon = items.icon;
          return (
            <NavLink
              // className="menu-item text-white text-decoration-none d-inline-block m-2"
              className={({ isActive }) =>
                `menu-item text-decoration-none d-inline-block m-2 ${
                  isActive ? "active" : "text-white"
                }`
              }
              to={items.route}
              key={items.id}
            >
              <div className="icon-wrapper">
                <span className="tooltip">{items.name}</span>
                <span>
                  <Icon className="menu-icon" />
                </span>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNavbar;
