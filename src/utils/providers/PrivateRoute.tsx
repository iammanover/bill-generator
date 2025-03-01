import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { RouteConstant } from "../enum/RouteConstant";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isLoggedIn } = useAuthentication();
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={RouteConstant.LOGIN} replace />
  );
};

export default PrivateRoute;
