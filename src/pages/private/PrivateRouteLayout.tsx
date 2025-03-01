import SideNavbar from "../../components/sidebar/SideNavbar";
import { Outlet } from "react-router-dom";

const PrivateRouteLayout = () => {
  return (
    <div className="container-fluid g-0 min-vh-100">
      <div className="row g-0">
        <div className="d-flex column-gap-2 w-100">
          <SideNavbar />
          <div className="w-100 pe-3 py-3" style={{ overflow: "hidden" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRouteLayout;
