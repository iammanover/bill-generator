import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Error from "../components/error/Error";
import PublicRoute from "../utils/providers/PublicRoute";
import PrivateRoute from "../utils/providers/PrivateRoute";
import { RouteConstant } from "../utils/enum/RouteConstant";
import Login from "../pages/public/Login";
import PrivateRouteLayout from "../pages/private/PrivateRouteLayout";
import BillGenerator from "../pages/private/billGenerator/BillGenerator";
import CustomerList from "../pages/private/customerList/CustomerList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteConstant.LOGIN} />,
      },

      // Public Routes
      {
        path: RouteConstant.LOGIN,

        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      // Private Routes
      {
        path: "/",
        element: (
          <PrivateRoute>
            <PrivateRouteLayout />
          </PrivateRoute>
        ),
        children: [
          // {
          //   index: true, // Redirect to default private route
          //   element: <Navigate to={RouteConstant.CUSTOMER_LIST} replace />,
          // },
          {
            path: RouteConstant.CUSTOMER_LIST,
            element: <CustomerList />,
          },
          {
            path: RouteConstant.BILL_GENERATOR,
            element: <BillGenerator />,
          },
        ],
      },
    ],
  },
]);

export default router;
